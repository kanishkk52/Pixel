from django.db import models

class User(models.Model):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=50, unique=True)
    picture = models.URLField()

    role = models.CharField(
        max_length=10,
        choices=[('user','user'), ('admin','admin')],
        default='user'
    )

    def __str__(self):
        return self.username