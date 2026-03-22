from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services import create_event, get_events

@api_view(['POST'])
def add_event(request):
    event = create_event(request.data)
    event["_id"] = str(event["_id"])
    return Response(event)


@api_view(['GET'])
def fetch_events(request):
    return Response(get_events())