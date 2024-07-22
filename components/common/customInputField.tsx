import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface InputProps {
  field: any;
  className?: string;
  placeholder?: string;
  isTextArea?: boolean;
  type?: string;
}

const CustomInputField = ({
  field,
  className,
  placeholder = "",
  type = "text",
  isTextArea = false,
}: InputProps) => {
  return isTextArea ? (
    <Textarea {...field} />
  ) : (
    <Input
      size={10}
      type={type}
      placeholder={placeholder}
      {...field}
      className={`sm` + className}
    />
  );
};

export default CustomInputField;
