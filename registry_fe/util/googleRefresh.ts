export async function refreshAccessToken(token: any) {
  console.log("REFRESH FUNCTION BEING CALLED");
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID as string,
        client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();
    console.log("REFRESHED TOKEN: ", refreshedTokens);

    if (!response.ok) {
      throw refreshedTokens;
    }

    token.idToken = refreshedTokens.id_token;
    token.refreshToken = refreshedTokens.refresh_token;
    token.expires = (refreshedTokens.expires_in as number) * 1000;
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
