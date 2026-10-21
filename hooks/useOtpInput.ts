import { useRef, useState } from "react";
import { focusNextInput, focusPreviousInput } from "@/utils/otpFocus";

// State + ref + handler untuk 6 kotak input OTP
export default function useOtpInput() {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);

  const inputRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  const handleChange = (e: { target: { value: string } }, index: number) => {
    const val = e.target.value;
    const updatedValues = [...otpValues];
    updatedValues[index] = val;
    setOtpValues(updatedValues);

    if (val.length === 1) {
      focusNextInput(index, inputRefs);
    } else if (val.length === 0) {
      focusPreviousInput(index, inputRefs);
    }
  };

  return { otpValues, setOtpValues, inputRefs, handleChange };
}
