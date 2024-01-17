import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import axios from "axios";

type TInMemoryCache = {
    [key: string]: any[]
}

const inMemoryCache: TInMemoryCache = {}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const token = await getToken({ req });
        if (token?.sub && token?.sub in inMemoryCache) {
            console.log('hit the cache!!!')
            return res.status(200).json(inMemoryCache[token.sub]);
        }
        if (token && token.sub) {
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
            inMemoryCache[token.sub] = response.data
            console.log('set the cache!!!')
            res.status(200).json(response.data);
        } else {
            res.status(401).end();
        }
    } catch (error) {
        res.status(401).end();
    }
}
