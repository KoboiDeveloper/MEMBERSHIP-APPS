import React from "react";
import Toast from "@/components/Toast";

type SuccessProps = {
  message: string;
};

export default function SuccessMessage({ message }: SuccessProps) {
  return <Toast type="success" message={message} />;
}
