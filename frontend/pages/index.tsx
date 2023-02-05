import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import ModalGiftqueueItem from "../components/modals/ModalGiftqueueItem";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Giftqueue</title>
        <meta name="description" content="Giftqueue, The Social Registry" />
        <link rel="icon" href="/giftqueue.ico" />
      </Head>
      <Layout />

      {/* Modals */}
      <ModalGiftqueueItem />
    </>
  );
};

export default Home;
