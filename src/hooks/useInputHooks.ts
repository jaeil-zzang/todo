import { FormEvent, FormEventHandler, useState } from "react";

import { handleChange } from "@/type";
import { instance } from "@/lib/axios";

type TInputValue = Record<string, string | number | boolean>;

type handleSubmitProps = {
  e: FormEvent<HTMLFormElement>;
  onSuccess?: () => void;
  onError?: () => void;
};

const useInputHooks = <T extends TInputValue>(inputValue: T) => {
  const [textValue, setTextValue] = useState<T>(inputValue);

  const [preview, setPreview] = useState<File | null>(null);

  const handleChange: handleChange = (e) => {
    const { type, value, name } = e.target;

    if (type === "text" || type === "date") {
      setTextValue((prev) => ({
        ...prev,
        [name]: value,
      }));
      return;
    } else if (e.target instanceof HTMLInputElement && type === "file") {
      if (!e.target.files) {
        return;
      }

      const { files } = e.target;

      setTextValue((prev) => ({
        ...prev,
        img: files[0].name,
      }));

      setPreview(files[0]);
    }
  };

  const handleSubmit = async ({ e, onError, onSuccess }: handleSubmitProps) => {
    e.preventDefault();

    if (Object.values(textValue).some((e) => e === "")) {
      return;
    }

    try {
      const res = await instance.post("/post", textValue);
      if (res.status === 201) {
        alert("등록 성공");

        setTextValue(inputValue);
        onSuccess && onSuccess();
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
        onError && onError();
      }
    }
  };

  return { handleChange, handleSubmit, textValue, preview };
};

export default useInputHooks;
