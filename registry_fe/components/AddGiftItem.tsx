import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddGiftItem = () => {
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>What is your wishlist item</Form.Label>
          <Form.Control type="text" placeholder="Enter item name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter a url</Form.Label>
          <Form.Control type="text" placeholder="Enter url here" />
        </Form.Group>
        <Button variant="secondary" type="button">
          Add url
        </Button>
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddGiftItem;
