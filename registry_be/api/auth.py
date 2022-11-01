from rest_framework_simplejwt.tokens import AccessToken

class RegistryToken(AccessToken):
    token_type = 'Bearer' 