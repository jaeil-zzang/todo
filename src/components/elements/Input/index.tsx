"use client";

import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, ...props }: Props) => {
  return (
    <div>
      <label htmlFor={props.name}>{label}</label>
      <input
        {...props}
        value={props.type !== "file" ? props.value : ""}
        accept={props.type === "image" ? "image/*" : ""}
      />
    </div>
  );
};

export default Input;
