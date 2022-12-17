import React from "react";
import Layout from "../components/Layout";
import AddDate from "../components/AddDate";
import AddGiftItem from "../components/AddGiftItem";
import MyGiftItems from "../components/MyGiftItems";

const account = () => {
  return (
    <Layout>
      <AddDate />
      <AddGiftItem />
      <MyGiftItems />
    </Layout>
  );
};

export default account;
