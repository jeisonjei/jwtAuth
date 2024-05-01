from django.core.management.base import BaseCommand
from api.models import Topic

class Command(BaseCommand):
    def handle(self, *args, **options):
        Topic.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Topics deleted'))
        Topic.objects.bulk_create([
            Topic(title='Topic 1', content='Content 1'),
            Topic(title='Topic 2', content='Content 2'),
            Topic(title='Topic 3', content='Content 3'),
            Topic(title='Topic 4', content='Content 4'),
            Topic(title='Topic 5', content='Content 5'),
            Topic(title='Topic 6', content='Content 6'),
            Topic(title='Topic 7', content='Content 7'),
            Topic(title='Topic 8', content='Content 8'),
            Topic(title='Topic 9', content='Content 9'),
            Topic(title='Topic 10', content='Content 10'),
            Topic(title='Topic 11', content='Content 11'),
            Topic(title='Topic 12', content='Content 12'),
        ])
        self.stdout.write(self.style.SUCCESS('Topics created'))
        