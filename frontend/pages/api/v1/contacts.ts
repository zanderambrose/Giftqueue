import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({ req });
  if (token) {
    // Signed in
    console.log("JSON Web Token", JSON.stringify(token, null, 2));
  }
  res.status(200).json({ name: "John Doe" });
}
