from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import AuthorChapterView,AuthorChapterDetailView,ChapterListView,ChapterDetailView

router = DefaultRouter()

urlpatterns= [
    # path('all-category', BookCategoryDetailView.as_view(), name='all-category'),
    path('book/<int:book_id>/chapter', ChapterListView.as_view(), name='book-chapter'),
    path('book/<int:book_id>/chapter/<int:chapter_id>', ChapterDetailView.as_view(), name='chapter-detail'),
    path('author/book/<int:book_id>/chapter', AuthorChapterView.as_view(), name='author-chapter-list'),
    path('author/book/<int:book_id>/chapter/<int:chapter_id>', AuthorChapterDetailView.as_view(), name='author-chapter-detail'),

]
