import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  if (token) {
    // Signed in
    const response = await axios.get(
      `https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses`,
      //   `https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses`,
      {
        headers: {
          Authorization: `Bearer ${token.google_auth}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.status(200).json(response.data);
  } else {
    res.status(401);
  }
}
