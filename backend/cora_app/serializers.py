from rest_framework import serializers
from .models import News, GalleryItem, GalleryCategory, Itinerary, ItineraryPoint, Membership, ContactMessage


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ['id', 'title_fr', 'title_en', 'slug', 'excerpt_fr', 'excerpt_en',
                  'content_fr', 'content_en', 'image', 'published_at', 'is_event', 'event_date']


class GalleryCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryCategory
        fields = ['id', 'name', 'label_fr', 'label_en']


class GalleryItemSerializer(serializers.ModelSerializer):
    category = GalleryCategorySerializer(read_only=True)

    class Meta:
        model = GalleryItem
        fields = ['id', 'category', 'title_fr', 'title_en', 'description_fr',
                  'description_en', 'image', 'video_url', 'is_featured', 'order']


class ItineraryPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItineraryPoint
        fields = ['id', 'name_fr', 'name_en', 'description_fr', 'description_en',
                  'latitude', 'longitude', 'image', 'order']


class ItinerarySerializer(serializers.ModelSerializer):
    points = ItineraryPointSerializer(many=True, read_only=True)

    class Meta:
        model = Itinerary
        fields = ['id', 'title_fr', 'title_en', 'slug', 'description_fr', 'description_en',
                  'distance_km', 'duration_min', 'difficulty', 'image', 'gpx_file', 'order', 'points']


class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = ['first_name', 'last_name', 'email', 'phone', 'address',
                  'membership_type', 'wants_newsletter', 'wants_volunteer', 'message', 'year']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']
