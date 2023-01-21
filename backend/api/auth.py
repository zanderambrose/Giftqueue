from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.exceptions import AuthenticationFailed, InvalidToken, TokenError
from django.utils.translation import gettext_lazy as _


class RegistryToken(AccessToken):
    token_type = 'Bearer'

class RegistryJWTAuthentication(JWTAuthentication):

    def get_user(self, validated_token):
        """
        Attempts to find and return a user using the given validated token.
        """
        try:
            user_id = validated_token[api_settings.USER_ID_CLAIM]
        except KeyError:
            raise InvalidToken(_("Token contained no recognizable user identification"))

        try:
            user = self.user_model.objects.get(**{api_settings.USER_ID_FIELD: user_id})
        except self.user_model.DoesNotExist:
            user = self.user_model.objects.create(
            sub = validated_token[api_settings.USER_ID_CLAIM],
            email = validated_token.get('email', ''),
            first_name = validated_token.get('given_name', ""),
            last_name = validated_token.get("family_name",'')),
            return user
            # raise AuthenticationFailed(_("User not found"), code="user_not_found")

        if not user.is_active:
            raise AuthenticationFailed(_("User is inactive"), code="user_inactive")

        return user

   
