import React from "react";

// Tampilan error layar penuh (putih), untuk state error halaman
export default function PageError({
  message = "Terjadi kesalahan saat memuat data.",
}: {
  message?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col gap-4 justify-center items-center bg-white px-8 text-center">
      <p className="text-sm text-gray-600">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-base-accent text-white text-sm fontMon tracking-wider px-8 py-3 rounded-full uppercase"
      >
        Muat Ulang
      </button>
    </div>
  );
}
