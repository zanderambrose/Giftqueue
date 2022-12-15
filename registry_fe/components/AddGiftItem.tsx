import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { ArrowRight, X } from "react-bootstrap-icons";

const AddGiftItem = () => {
  const [urlArr, setUrlArr] = useState<string[]>([""]);
  const handleClearUrlClick = () => {
    console.log("handle click called");
    setUrlArr((currVal) => {
      return currVal.filter((item) => {
        return item !== "";
      });
    });
  };
  const handleAddUrlClick = () => {
    if (urlArr.at(-1) === "") {
      alert("fill in the first url first boi");
    } else {
      setUrlArr((currVal) => [...currVal, ""]);
    }
  };
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>What is your wishlist item</Form.Label>
          <Form.Control type="text" placeholder="Enter item name" />
        </Form.Group>
        {urlArr.map((item) => {
          return (
            <div key={urlArr.length}>
              <Form.Label>Enter a url {urlArr.length}</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                  aria-label="Amount (to the nearest dollar)"
                />
                <InputGroup.Text onClick={() => handleClearUrlClick()}>
                  <X color="red" size={20} />
                </InputGroup.Text>
              </InputGroup>
            </div>
          );
        })}
        <Button
          onClick={() => handleAddUrlClick()}
          className="mb-3"
          variant="secondary"
          type="button"
        >
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
