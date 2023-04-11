from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Item
from .serializers import ItemSerializer
from prometheus_client import Counter
from django.http import HttpResponse

http_requests_total = Counter(
    'http_requests_total',  # metric name
    'Total number of HTTP requests',  # metric description
    ['method', 'endpoint', 'status_code'],  # labels
)

@api_view(['POST'])
def create_item(request):
    http_requests_total.labels(
        method=request.method,
        endpoint=request.path,
        status_code=status.HTTP_201_CREATED,
    ).inc()

    serializer = ItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'item_id': serializer.data['item_id']}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def item_detail(request, name):
    try:
        item = Item.objects.get(name=name)
    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        http_requests_total.labels(
            method=request.method,
            endpoint=request.path,
            status_code=status.HTTP_200_OK,
        ).inc()
        serializer = ItemSerializer(item)
        return Response(serializer.data)

    elif request.method == 'PUT':
        http_requests_total.labels(
            method=request.method,
            endpoint=request.path,
            status_code=status.HTTP_200_OK,
        ).inc()
        serializer = ItemSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        http_requests_total.labels(
            method=request.method,
            endpoint=request.path,
            status_code=status.HTTP_204_NO_CONTENT,
        ).inc()
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)