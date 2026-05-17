from django.db import models


class News(models.Model):
    title_fr = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    excerpt_fr = models.TextField()
    excerpt_en = models.TextField()
    content_fr = models.TextField()
    content_en = models.TextField()
    image = models.ImageField(upload_to='news/', blank=True, null=True)
    published_at = models.DateTimeField(auto_now_add=True)
    is_published = models.BooleanField(default=True)
    is_event = models.BooleanField(default=False)
    event_date = models.DateField(blank=True, null=True)

    class Meta:
        verbose_name = "Actualité"
        verbose_name_plural = "Actualités"
        ordering = ['-published_at']

    def __str__(self):
        return self.title_fr


class GalleryCategory(models.Model):
    CATEGORY_CHOICES = [
        ('photos', 'Photos'),
        ('reconstructions', 'Reconstitutions'),
        ('plans', 'Plans & Cartes'),
        ('videos', 'Vidéos'),
        ('chantier', 'Chantier de restauration'),
    ]
    name = models.CharField(max_length=50, choices=CATEGORY_CHOICES, unique=True)
    label_fr = models.CharField(max_length=100)
    label_en = models.CharField(max_length=100)

    class Meta:
        verbose_name = "Catégorie galerie"
        verbose_name_plural = "Catégories galerie"

    def __str__(self):
        return self.label_fr


class GalleryItem(models.Model):
    category = models.ForeignKey(GalleryCategory, on_delete=models.SET_NULL, null=True, related_name='items')
    title_fr = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255)
    description_fr = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    image = models.ImageField(upload_to='gallery/', blank=True, null=True)
    video_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Élément de galerie"
        verbose_name_plural = "Éléments de galerie"
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title_fr


class Itinerary(models.Model):
    DIFFICULTY_CHOICES = [
        ('easy', 'Facile'),
        ('medium', 'Moyen'),
        ('hard', 'Difficile'),
    ]
    title_fr = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description_fr = models.TextField()
    description_en = models.TextField()
    distance_km = models.DecimalField(max_digits=5, decimal_places=1)
    duration_min = models.PositiveIntegerField(help_text="Durée en minutes")
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES, default='easy')
    image = models.ImageField(upload_to='itineraries/', blank=True, null=True)
    gpx_file = models.FileField(upload_to='gpx/', blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Itinéraire"
        verbose_name_plural = "Itinéraires"
        ordering = ['order']

    def __str__(self):
        return self.title_fr


class ItineraryPoint(models.Model):
    itinerary = models.ForeignKey(Itinerary, on_delete=models.CASCADE, related_name='points')
    name_fr = models.CharField(max_length=255)
    name_en = models.CharField(max_length=255)
    description_fr = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    latitude = models.DecimalField(max_digits=10, decimal_places=7)
    longitude = models.DecimalField(max_digits=10, decimal_places=7)
    image = models.ImageField(upload_to='itinerary_points/', blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Point d'itinéraire"
        verbose_name_plural = "Points d'itinéraire"
        ordering = ['order']

    def __str__(self):
        return f"{self.itinerary.title_fr} — {self.name_fr}"


class Membership(models.Model):
    MEMBERSHIP_TYPE_CHOICES = [
        ('individual', 'Individuelle — 15 €'),
        ('family', 'Familiale — 25 €'),
        ('student', 'Étudiant/Chômeur — 8 €'),
        ('benefactor', 'Bienfaiteur — 50 € et plus'),
    ]
    STATUS_CHOICES = [
        ('pending', 'En attente'),
        ('confirmed', 'Confirmée'),
        ('cancelled', 'Annulée'),
    ]
    first_name = models.CharField(max_length=100, verbose_name="Prénom")
    last_name = models.CharField(max_length=100, verbose_name="Nom")
    email = models.EmailField(verbose_name="E-mail")
    phone = models.CharField(max_length=20, blank=True, verbose_name="Téléphone")
    address = models.TextField(blank=True, verbose_name="Adresse postale")
    membership_type = models.CharField(
        max_length=20, choices=MEMBERSHIP_TYPE_CHOICES, default='individual',
        verbose_name="Type d'adhésion"
    )
    wants_newsletter = models.BooleanField(default=True, verbose_name="Newsletter")
    wants_volunteer = models.BooleanField(default=False, verbose_name="Bénévolat chantier")
    message = models.TextField(blank=True, verbose_name="Message")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    submitted_at = models.DateTimeField(auto_now_add=True)
    year = models.PositiveIntegerField(default=2026, verbose_name="Année d'adhésion")

    class Meta:
        verbose_name = "Adhésion"
        verbose_name_plural = "Adhésions"
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.last_name} {self.first_name} — {self.get_membership_type_display()} ({self.year})"


class ContactMessage(models.Model):
    name = models.CharField(max_length=200, verbose_name="Nom")
    email = models.EmailField(verbose_name="E-mail")
    subject = models.CharField(max_length=255, verbose_name="Sujet")
    message = models.TextField(verbose_name="Message")
    submitted_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Message de contact"
        verbose_name_plural = "Messages de contact"
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.name} — {self.subject}"
