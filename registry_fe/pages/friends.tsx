import React from "react";
import Form from "react-bootstrap/Form";
import Layout from "../components/Layout";
import Button from "react-bootstrap/Button";
import { useQuery } from "@tanstack/react-query";
import { useRegistryApi } from "../util/clientApi";

const Friends = () => {
  // RegistyApi
  const { getAllFriends } = useRegistryApi();
  // Queries
  const { data, isError, isSuccess } = useQuery({
    queryKey: ["friends"],
    queryFn: getAllFriends,
  });
  return (
    <Layout>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-secondary">Search</Button>
      </Form>
      {data && (
        <ul>
          {data?.map((friend: any) => {
            return <li key={friend.id}>{friend.email}</li>;
          })}
        </ul>
      )}
    </Layout>
  );
};

export default Friends;
