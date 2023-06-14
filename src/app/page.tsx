import Link from "next/link";
import styles from "./page.module.scss";
import Button from "@/components/elements/button";

import { IAddPost } from "./addPost/page";

import Table from "@/components/client/table";
import { Suspense } from "react";

const getData = async (): Promise<IAddPost[]> => {
  const res = await fetch("http://localhost:4000/post", {
    cache: "no-store",
  });

  return res.json();
};

export default async function Home() {
  const data = await getData();

  return (
    <main className={styles.container}>
      <section>
        <Link href={"/addPost"}>
          <Button label="Todo 작성"></Button>
        </Link>

        <Suspense fallback={<div>...loading</div>}>
          <Table data={data} />
        </Suspense>
      </section>
    </main>
  );
}
