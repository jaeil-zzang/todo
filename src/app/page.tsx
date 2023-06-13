import Link from "next/link";
import styles from "./page.module.scss";
import Button from "@/components/elements/button";
import { instance } from "@/lib/axios";
import Image from "next/image";
import { IAddPost } from "./addPost/page";

import Table from "@/components/client/table";

export const getData = async (): Promise<IAddPost[]> => {
  const res = await instance.get("/post");

  return res.data;
};

export default async function Home() {
  const data = await getData();

  return (
    <main className={styles.container}>
      <section>
        <Link href={"/addPost"}>
          <Button label="Todo 작성"></Button>
        </Link>

        <Table data={data} />
      </section>
    </main>
  );
}
