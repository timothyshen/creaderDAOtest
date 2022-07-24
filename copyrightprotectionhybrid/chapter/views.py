from rest_framework.generics import (ListCreateAPIView, ListAPIView,
                                     RetrieveAPIView, RetrieveUpdateDestroyAPIView)
from rest_framework.permissions import AllowAny

from chapter.serializers import ChapterSerializer
from .models import Chapter
from .permission import IsAuthedPermission


# Create your views here.

class AuthorChapterView(ListCreateAPIView):
    serializer_class = ChapterSerializer
    permission_classes = [IsAuthedPermission, ]

    def get_queryset(self):
        return Chapter.objects.filter(bookID=self.kwargs.get('book_id', None))


class AuthorChapterDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = ChapterSerializer
    permission_classes = [IsAuthedPermission, ]

    def get_queryset(self):
        return Chapter.objects.get(bookID=self.kwargs.get('book_id', None), arID=self.kwargs.get('arID', None))


class ChapterListView(ListAPIView):
    serializer_class = ChapterSerializer
    permission_classes = [AllowAny,]

    def get_queryset(self):
        return Chapter.objects.filter(bookID=self.kwargs.get('bookID', None))


class ChapterDetailView(RetrieveAPIView):
    serializer_class = ChapterSerializer
    permission_classes = [AllowAny, ]

    def get_queryset(self):
        return Chapter.objects.get(bookID=self.kwargs.get('book_id', None), arID=self.kwargs.get('arID', None))
