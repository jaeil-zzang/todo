"use client";

import Link from "next/link";
import styles from "./table.module.scss";
import { instance } from "@/lib/axios";
import Button from "@/components/elements/button";
import { IAddPost } from "@/app/addPost/page";
import Input from "@/components/elements/Input";

interface Props<T> {
  data: T[];
}

const Table = <T extends IAddPost>({ data }: Props<T>) => {
  return (
    <table className={styles.todoList}>
      <thead>
        <tr>
          <th className={styles.title}>제목</th>
          <th className={styles.content}>내용</th>
          <th className={styles.date}>날짜</th>
          <th className={styles.success}>완료</th>
          <th className={styles.delete}>삭제</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, title, content, date, success }) => {
          let checked = success;

          return (
            <tr
              key={id}
              className={`${checked ? styles.completed : styles.default}`}
            >
              <td>{title}</td>
              <td>
                <p>
                  <Link href={`/patch/${id}`}>{content}</Link>
                </p>
              </td>
              <td>{date}</td>
              <td>
                <Input
                  label=""
                  type="checkbox"
                  defaultChecked={checked}
                  onClick={async () => {
                    try {
                      const res = await instance.patch(`/post/${id}`, {
                        success: !checked,
                      });

                      if (res.status === 200) checked = res.data.success;
                    } catch (error) {
                      if (error instanceof Error) {
                        console.log(error);
                      }
                    }
                  }}
                />
              </td>
              <td>
                <Button
                  label="삭제"
                  onClick={async () => {
                    try {
                      const res = await instance.delete(`/post/${id}`);

                      if (res.status === 200) {
                        alert("삭제 성공");
                      }
                    } catch (error) {
                      if (error instanceof Error) {
                        console.log(error);
                      }
                    }
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
