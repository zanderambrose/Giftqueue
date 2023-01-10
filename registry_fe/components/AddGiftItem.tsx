import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { X } from "react-bootstrap-icons";
import { useRegistryApi } from "../util/clientApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axios from "axios";

const AddGiftItem = () => {
  const [wishListName, setWishListName] = useState("");
  const [wishListUrl, setWishListUrl] = useState("");

  // RegistyApi
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  // Mutations
  const { mutate, isError, isIdle, isLoading, isSuccess } = useMutation({
    mutationFn: () => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}wishlist/`,
        { name: wishListName, url: wishListUrl },
        { headers: { Authorization: `Bearer ${session?.idToken}` } }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myGiftItems"] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setWishListName("");
    setWishListUrl("");
    e.preventDefault();
    mutate();
  };

  return (
    <>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>What is your wishlist item</Form.Label>
          <Form.Control
            onChange={(e) => setWishListName(e.target.value)}
            type="text"
            placeholder="Enter item name"
            value={wishListName}
          />
        </Form.Group>
        <Form.Label>Enter a url</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            onChange={(e) => setWishListUrl(e.target.value)}
            placeholder="Enter url"
            aria-label="Amount (to the nearest dollar)"
            value={wishListUrl}
          />
          <InputGroup.Text>
            <X color="red" size={20} />
          </InputGroup.Text>
        </InputGroup>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddGiftItem;
