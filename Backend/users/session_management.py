import jwt
# import time from django
from django.utils import timezone
from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
def create_session(user,user_type) -> str:
    """Create a session for the user and return the token
    Args:
        user (Users): The user for which the session is to be created
    Returns:
        str: The token for the session
        note: The token is a JWT token
    """
    payload = {
        'user_id': user.id,
        'type': user_type,
        'exp': timezone.now() + timezone.timedelta(days=1),
        'iat': timezone.now()
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    # print("token: ",token)
    return token
def get_user_id_from_token(token):
    # print ("token: ",token)
    try:
        # Decode the token using the secret key
        payload = jwt.decode(token.strip(), settings.SECRET_KEY, algorithms=['HS256'])
        user_id = payload['user_id']
        user_type = payload['type']
        return user_id,user_type
    except jwt.ExpiredSignatureError:
        # Handle token expiration error
        message = "Token expired."
        # print(message)
        return message
    except jwt.InvalidTokenError:
        # Handle invalid token error
        message = "Invalid token."
        # print(message)
        return message
    

# account activation email
class AccountActivationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
            str(user.pk) + str(timestamp) + str(user.is_activated)
        )
account_activation_token = AccountActivationTokenGenerator()
