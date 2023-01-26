import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Giftqueue</title>
        <meta name="description" content="Giftqueue, The Social Registry" />
        <link rel="icon" href="/giftqueue.ico" />
      </Head>
      <Layout />
    </div>
  );
};

export default Home;
