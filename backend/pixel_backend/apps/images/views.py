from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services import add_image, get_images

@api_view(['POST'])
def upload_image(request):
    image = add_image(request.data)
    image["_id"] = str(image["_id"])
    return Response(image)


@api_view(['GET'])
def fetch_images(request):
    event_id = request.GET.get("event_id")
    return Response(get_images(event_id))