import jwt
from jwt import PyJWKClient

token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1MmRlMjdmNTE1NzM3NTM5NjAwZDg5YjllZTJlNGVkNTM1ZmI1MTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzNjI0MzkyMzI5LTUwaWxuZHZ0cWMwNDVhNWVkdG4zdHJvYjc1b29ib29pLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMzYyNDM5MjMyOS01MGlsbmR2dHFjMDQ1YTVlZHRuM3Ryb2I3NW9vYm9vaS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExNjA3MjE4MTY4MDg4NjM2Njg1MyIsImVtYWlsIjoiYWxleGFuZGVyLmQuYW1icm9zZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6InA2SzNZNkJYZzQwNE5BNzV2WW9ZUVEiLCJuYW1lIjoiQWxleGFuZGVyIEFtYnJvc2UiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNVF2R3dOSWVKR2c5SktiU253RWxBalZvSzBkcW9fam9qUHYtcmhXdz1zOTYtYyIsImdpdmVuX25hbWUiOiJBbGV4YW5kZXIiLCJmYW1pbHlfbmFtZSI6IkFtYnJvc2UiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTY3MDcyOTk5NCwiZXhwIjoxNjcwNzMzNTk0fQ.S3eRPBuowVbLIwr5h3K68wJO3acK-yu9h6l1WJCftn11TQ8jrao6SljvmbeWxulQcTmSGjB1M_-BLtcax2gghs0gDQv_SvuccmZdY4qT9LiqnN9wuU7B6hdYpB1qtFxh-nLGxAIEiSYSjmBy1iGt2zaxBWZUZI2y6oYFRpAUO_IiRCA2-dvEJWcUolnIfCH0-aatEMH-KGfLNDOn7INeFCLXWiULA989u77fP-3xTxUCTry6Uoaz39tTCM171f6LYW868csninLer7M4KGoxbJLNTtl5HEQXoJyuk6vj9hnvNGABd2zUcrO19bUt4M0t161u9U6dI12JMq-r8RzB2w'
jwks_client = PyJWKClient("https://www.googleapis.com/oauth2/v3/certs")
signing_key = jwks_client.get_signing_key_from_jwt(token)
data = jwt.decode(
                token,
                signing_key.key,
                algorithms=['RS256'],
                audience="3624392329-50ilndvtqc045a5edtn3trob75oobooi.apps.googleusercontent.com",
                issuer="https://accounts.google.com",
                leeway=0,
                options={
                    "verify_aud": True,
                    "verify_signature": True,
                }
)

print(signing_key.key)
# print(f'DATA: ', data)