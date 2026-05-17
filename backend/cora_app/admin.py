from django.contrib import admin
from django.utils.html import format_html
from .models import News, GalleryItem, GalleryCategory, Itinerary, ItineraryPoint, Membership, ContactMessage


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ['title_fr', 'is_published', 'is_event', 'event_date', 'published_at']
    list_filter = ['is_published', 'is_event']
    search_fields = ['title_fr', 'title_en']
    prepopulated_fields = {'slug': ('title_fr',)}
    list_editable = ['is_published']


class GalleryItemInline(admin.TabularInline):
    model = GalleryItem
    extra = 1
    fields = ['title_fr', 'image', 'is_featured', 'order']


@admin.register(GalleryCategory)
class GalleryCategoryAdmin(admin.ModelAdmin):
    list_display = ['label_fr', 'label_en', 'name']
    inlines = [GalleryItemInline]


@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ['title_fr', 'category', 'is_featured', 'order', 'preview']
    list_filter = ['category', 'is_featured']
    list_editable = ['is_featured', 'order']
    search_fields = ['title_fr', 'title_en']

    def preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height:50px;"/>', obj.image.url)
        return '—'
    preview.short_description = 'Aperçu'


class ItineraryPointInline(admin.TabularInline):
    model = ItineraryPoint
    extra = 1
    fields = ['name_fr', 'latitude', 'longitude', 'order', 'image']


@admin.register(Itinerary)
class ItineraryAdmin(admin.ModelAdmin):
    list_display = ['title_fr', 'distance_km', 'duration_min', 'difficulty', 'order']
    prepopulated_fields = {'slug': ('title_fr',)}
    inlines = [ItineraryPointInline]


@admin.register(Membership)
class MembershipAdmin(admin.ModelAdmin):
    list_display = ['last_name', 'first_name', 'email', 'membership_type', 'year', 'status', 'submitted_at']
    list_filter = ['status', 'membership_type', 'year', 'wants_volunteer']
    search_fields = ['last_name', 'first_name', 'email']
    list_editable = ['status']
    readonly_fields = ['submitted_at']


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'submitted_at', 'is_read']
    list_filter = ['is_read']
    search_fields = ['name', 'email', 'subject']
    list_editable = ['is_read']
    readonly_fields = ['submitted_at']
