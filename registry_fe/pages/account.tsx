import React, { useState } from "react";
import Layout from "../components/Layout";
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const account = () => {
  const { data: session } = useSession();
  const [date, setDate] = useState(new Date());
  const [dayName, setDayName] = useState("");

  // Mutations
  const { mutate, isError, isIdle, isLoading, isSuccess } = useMutation({
    mutationFn: () => {
      const dateFormatted = [
        date.getFullYear(),
        ("0" + (date.getMonth() + 1)).slice(-2),
        ("0" + date.getDate()).slice(-2),
      ].join("-");
      return axios.post(
        `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}celebration/`,
        { name: dayName, date: dateFormatted },
        { headers: { Authorization: `Bearer ${session?.idToken}` } }
      );
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <Layout>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>What is the name of your day</Form.Label>
          <Form.Control
            onChange={(e) => setDayName(e.target.value)}
            type="text"
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter your date below</Form.Label>
          <DatePicker
            selected={date}
            onChange={(selectedDate: Date) => {
              setDate(selectedDate);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Layout>
  );
};

export default account;
