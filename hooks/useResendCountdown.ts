import { useEffect, useState } from "react";

// Hitung mundur untuk tombol "Kirim ulang OTP"
export default function useResendCountdown(seconds = 60) {
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (countdown === null) return;

    const timer = setTimeout(() => {
      setCountdown((prev) => (prev !== null && prev > 1 ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const startCountdown = () => setCountdown(seconds);

  return { countdown, isWaiting: countdown !== null, startCountdown };
}
