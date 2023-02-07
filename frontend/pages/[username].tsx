import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { navigationState } from "../recoil/navigation/navigationState";

const FriendProfile: NextPage = () => {
  const router = useRouter();
  const setNavState = useSetRecoilState(navigationState);
  const { username } = router.query;
  useEffect(() => {
    if (router.pathname !== "/") {
      setNavState("friends");
    }
  }, [router.pathname]);
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
