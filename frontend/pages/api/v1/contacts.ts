import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = await getToken({ req });
    if (token) {
      // Signed in
      const response = await axios.get(
        `https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers,photos,metadata`,
        {
          headers: {
            Authorization: `Bearer ${token.google_auth}`,
            "Content-Type": "application/json",
          },
        }
      );
      res.status(200).json(response.data);
    } else {
      res.status(401).end();
    }
  } catch (error) {
    res.status(401).end();
  }
}
