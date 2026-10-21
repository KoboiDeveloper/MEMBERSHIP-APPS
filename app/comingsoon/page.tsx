"use client";

import React from "react";
import Link from "next/link";

const commingsoon = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center items-center w-full max-w-md min-h-screen bg-white">
        <p className="text-center text-gray-500">
          Fitur belum tersedia untuk saat ini.
        </p>
        <Link href="/home">
          <p className="underline underline-offset-4 my-5">
            Kembali ke Beranda
          </p>
        </Link>
      </div>
    </div>
  );
};

export default commingsoon;
