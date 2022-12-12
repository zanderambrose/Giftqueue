import React from "react";
import Form from "react-bootstrap/Form";
import Layout from "../components/Layout";
import Button from "react-bootstrap/Button";

const Friends = () => {
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
    </Layout>
  );
};

export default Friends;
