from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from .models import News, GalleryItem, GalleryCategory, Itinerary, Membership, ContactMessage
from .serializers import (
    NewsSerializer, GalleryItemSerializer, GalleryCategorySerializer,
    ItinerarySerializer, MembershipSerializer, ContactMessageSerializer,
)


class NewsList(generics.ListAPIView):
    serializer_class = NewsSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = News.objects.filter(is_published=True)
        if self.request.query_params.get('events_only'):
            qs = qs.filter(is_event=True)
        return qs


class NewsDetail(generics.RetrieveAPIView):
    serializer_class = NewsSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'
    queryset = News.objects.filter(is_published=True)


class GalleryCategoryList(generics.ListAPIView):
    serializer_class = GalleryCategorySerializer
    permission_classes = [AllowAny]
    queryset = GalleryCategory.objects.all()


class GalleryItemList(generics.ListAPIView):
    serializer_class = GalleryItemSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = GalleryItem.objects.select_related('category').all()
        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(category__name=category)
        featured = self.request.query_params.get('featured')
        if featured:
            qs = qs.filter(is_featured=True)
        return qs


class ItineraryList(generics.ListAPIView):
    serializer_class = ItinerarySerializer
    permission_classes = [AllowAny]
    queryset = Itinerary.objects.prefetch_related('points').all()


class ItineraryDetail(generics.RetrieveAPIView):
    serializer_class = ItinerarySerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'
    queryset = Itinerary.objects.prefetch_related('points').all()


class MembershipCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = MembershipSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'Votre demande d\'adhésion a été enregistrée. Merci !'},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ContactCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'Votre message a été envoyé. Nous vous répondrons rapidement.'},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
