from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services import create_user, get_users

@api_view(['POST'])
def login_user(request):
    user = create_user(request.data)
    user["_id"] = str(user["_id"])
    return Response(user)


@api_view(['GET'])
def fetch_users(request):
    return Response(get_users())