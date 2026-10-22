import React from "react";
import Image from "next/image";
import Button from "@/components/Button";

type ModalSurveyPopupProps = {
  imageUrl?: string;
  brand?: string;
  title: string;
  description: string;
  closeModal: () => void;
  onAction: () => void;
};

export default function ModalSurveyPopup({
  imageUrl,
  brand,
  title,
  description,
  closeModal,
  onAction,
}: ModalSurveyPopupProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-6"
      onClick={closeModal}
    >
      <div
        className="bg-white w-full max-w-sm shadow-lg p-6 rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end items-center mb-2">
          <button
            onClick={closeModal}
            className="text-black"
            aria-label="Tutup"
          >
            &#10005;
          </button>
        </div>

        {imageUrl && (
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}mission/${imageUrl}`}
            alt={title}
            width={600}
            height={400}
            className="w-full max-h-40 object-cover rounded-lg bg-slate-400 mb-4"
          />
        )}

        {brand && (
          <div className="flex justify-center mb-3">
            <span className="text-[10px] fontMon text-amber-800 tracking-wider rounded-md bg-amber-50 p-2 border border-amber-200">
              {brand.toUpperCase()}
            </span>
          </div>
        )}

        <h2 className="text-lg font-bold text-center mb-2">{title}</h2>
        <p className="text-gray-600 text-center text-xs fontMon mb-6">
          {description}
        </p>

        <div className="flex justify-center">
          <Button
            label="Ikuti Misi"
            className="bg-base-accent text-white"
            onClick={onAction}
          />
        </div>
      </div>
    </div>
  );
}
