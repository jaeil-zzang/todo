"use client";

import Input from "@/components/elements/Input";
import Button from "@/components/elements/button";

import logo from "../../../public/next.svg";

import styles from "./page.module.scss";
import useInputHooks from "@/hooks/useInputHooks";

import Image from "next/image";
import { useRouter } from "next/navigation";

export type IAddPost = {
  id?: string;
  title: string;
  content: string;
  date: string;
  img: string;
  success: boolean;
};

const AddPost = () => {
  const router = useRouter();

  const { handleChange, handleSubmit, textValue, preview } =
    useInputHooks<IAddPost>({
      title: "",
      content: "",
      date: "",
      img: "",
      success: false,
    });

  return (
    <main>
      <section>
        <form
          className={styles.form}
          onSubmit={(e) =>
            handleSubmit({
              e,
              onSuccess: () => router.push("/"),
              onError: () => router.push("/"),
            })
          }
        >
          <Input
            label={"제목"}
            name={"title"}
            value={textValue["title"]}
            onChange={handleChange}
          />
          <Input
            label={"내용"}
            name={"content"}
            value={textValue["content"]}
            onChange={handleChange}
          />
          <Input
            label={"사진"}
            name={"img"}
            value={textValue["img"]}
            onChange={handleChange}
            type="file"
          />
          <Input
            label={"날짜"}
            name={"date"}
            type="date"
            value={textValue["date"]}
            onChange={handleChange}
          />

          <Button type="submit" label="작성완료" />
        </form>

        <div className={styles.imgBox}>
          <Image
            src={preview ? URL.createObjectURL(preview) : logo}
            alt="preview"
            fill
          />
        </div>
      </section>
    </main>
  );
};

export default AddPost;
