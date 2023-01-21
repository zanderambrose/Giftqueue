import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Giftqueue</title>
        <meta name="description" content="Giftqueue, The Social Registry" />
        <link rel="icon" href="/giftqueue.ico" />
      </Head>
      <h1 className="text-3xl font-bold underline">Hello world</h1>
    </div>
  );
};

export default Home;
