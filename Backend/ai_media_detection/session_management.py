import jwt
from datetime import datetime, timedelta
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework.exceptions import AuthenticationFailed
from .models import Users

def create_session(user: Users) -> str:
    """Create a session for the user and return the token
    Args:
        user (Users): The user for which the session is to be created
    Returns:
        str: The token for the session
        note: The token is a JWT token
    """
    payload = {
        'user_id': user.id,
        'exp': datetime.now() + timedelta(days=1),
        'iat': datetime.now()
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    token = token.decode('utf-8')
    return token
def get_user_id_from_token(token):
    try:
        # Decode the token using the secret key
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = payload['user_id']
        return user_id
    except jwt.ExpiredSignatureError:
        # Handle token expiration error
        print("Token has expired.")
        return None
    except jwt.InvalidTokenError:
        # Handle invalid token error
        print("Invalid token.")
        return None