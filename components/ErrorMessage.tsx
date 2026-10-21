import React from "react";
import Toast from "@/components/Toast";

type ErrorProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorProps) {
  return <Toast type="error" message={message} />;
}
