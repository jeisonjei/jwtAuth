from typing import Any
from django.core.management import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    def handle(self, *args: Any, **options: Any) -> str | None:
        user = User.objects.filter(username='admin').first()
        if user is not None:
            self.stdout.write(f'Superuser already exists',self.style.HTTP_INFO)
            
        else:
            user = User.objects.create_superuser(username='admin',password='admin')
            if user.is_superuser:
                self.stdout.write(f'Superuser created',self.style.SUCCESS)

            else:
                self.stdout.write(f'Superuser not created',self.style.ERROR)