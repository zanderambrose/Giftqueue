import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const FriendProfile: NextPage = () => {
  const router = useRouter();
  const { username } = router.query;
  return (
    <div>
      <Head>
        <title>Giftqueue | {username}</title>
        <meta name="description" content="Giftqueue, The Social Registry" />
        <link rel="icon" href="/giftqueue.ico" />
      </Head>
      <Layout />
    </div>
  );
};

export default FriendProfile;
