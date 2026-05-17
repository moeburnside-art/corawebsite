from django.urls import path
from . import views

urlpatterns = [
    path('news/', views.NewsList.as_view(), name='news-list'),
    path('news/<slug:slug>/', views.NewsDetail.as_view(), name='news-detail'),
    path('gallery/categories/', views.GalleryCategoryList.as_view(), name='gallery-categories'),
    path('gallery/', views.GalleryItemList.as_view(), name='gallery-list'),
    path('itineraries/', views.ItineraryList.as_view(), name='itinerary-list'),
    path('itineraries/<slug:slug>/', views.ItineraryDetail.as_view(), name='itinerary-detail'),
    path('membership/', views.MembershipCreate.as_view(), name='membership-create'),
    path('contact/', views.ContactCreate.as_view(), name='contact-create'),
]
