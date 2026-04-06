from rest_framework.decorators import api_view
from rest_framework.response import Response

from .services import get_posts, create_post


@api_view(['GET'])
def fetch_posts(request):
    return Response(get_posts())


@api_view(['POST'])
def add_post(request):
    post = create_post(request.data)
    post["_id"] = str(post["_id"])
    return Response(post)