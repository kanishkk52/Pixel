from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

from .services import get_posts, create_post, delete_post


# 🔥 FETCH POSTS
@api_view(['GET'])
def fetch_posts(request):
    try:
        posts = get_posts()
        return Response(posts, status=status.HTTP_200_OK)
    except Exception as e:
        print("❌ Fetch posts error:", e)
        return Response({"error": str(e)}, status=500)


# 🔥 CREATE POST
@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def add_post(request):
    try:
        file = request.FILES.get("image")

        print("📥 Creating post...")

        post = create_post(file, request.data)

        if not post:
            return Response(
                {"error": "Post creation failed"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(post, status=status.HTTP_201_CREATED)

    except Exception as e:
        print("❌ Create post error:", e)
        return Response({"error": str(e)}, status=500)


# 🔥 DELETE POST (NEW)
@api_view(['DELETE'])
def delete_post_view(request, post_id):
    try:
        result = delete_post(post_id)

        if not result:
            return Response({"error": "Post not found"}, status=404)

        return Response({"message": "Post deleted successfully"})

    except Exception as e:
        print("❌ Delete post error:", e)
        return Response({"error": str(e)}, status=500)