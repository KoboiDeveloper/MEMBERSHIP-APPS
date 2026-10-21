"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ToastProps = {
  message: string;
  type?: "success" | "error";
  duration?: number; // ms
};

// Toast yang tampil bersamaan disusun ke bawah, bukan saling menimpa
const TOAST_STEP = 64; // px
let nextId = 0;
const activeIds: number[] = [];
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());

function useToastIndex(active: boolean) {
  const [id] = useState(() => nextId++);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) return;

    const update = () => setIndex(Math.max(activeIds.indexOf(id), 0));
    activeIds.push(id);
    listeners.add(update);
    notify();

    return () => {
      listeners.delete(update);
      activeIds.splice(activeIds.indexOf(id), 1);
      notify();
    };
  }, [id, active]);

  return index;
}

export default function Toast({
  message,
  type = "success",
  duration = 4000,
}: ToastProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const index = useToastIndex(mounted && visible);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [message, duration]);

  if (!mounted || !visible) return null;

  const isSuccess = type === "success";

  return createPortal(
    <div
      className="fixed left-1/2 z-[100] w-full max-w-md -translate-x-1/2 px-4 pointer-events-none"
      style={{ top: 16 + index * TOAST_STEP }}
    >
      <div
        role="alert"
        className={`toast-in pointer-events-auto flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white shadow-lg fontMon ${
          isSuccess ? "bg-green-600" : "bg-red-600"
        }`}
      >
        <Image
          src={
            isSuccess
              ? "/images/succes-alert.svg"
              : "/images/triangle-alert.svg"
          }
          width={20}
          height={20}
          alt=""
          className="w-5 h-5 shrink-0"
        />
        <span>{message}</span>
      </div>
    </div>,
    document.body,
  );
}
