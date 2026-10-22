import React, { useRef } from "react";

type SurveyModalProps = {
  title: string;
  url: string;
  onClose: () => void;
  onSubmitted: () => void;
};

// Google Form hanya bisa di-embed dengan parameter embedded=true
const toEmbedUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("embedded", "true");
    return parsed.toString();
  } catch {
    return url;
  }
};

export default function SurveyModal({
  title,
  url,
  onClose,
  onSubmitted,
}: SurveyModalProps) {
  // Google Form tidak mengirim event ke parent. Load pertama iframe adalah
  // form-nya, load kedua adalah halaman "jawaban direkam" setelah submit.
  const loadCount = useRef(0);

  const handleLoad = () => {
    loadCount.current += 1;
    if (loadCount.current >= 2) {
      onSubmitted();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-dvh flex flex-col bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-3 shrink-0">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button className="text-sm text-gray-500" onClick={onClose}>
            ✕
          </button>
        </div>
        <iframe
          src={toEmbedUrl(url)}
          title={title}
          onLoad={handleLoad}
          className="w-full flex-1 min-h-0 border-0"
        >
          Memuat...
        </iframe>
      </div>
    </div>
  );
}
