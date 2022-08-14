from django.db import models


# Create your models here.
class Chapter(models.Model):
    PUBLISH_STATUS = (
        ('Published', u'Published'),
        ('Draft', u'Draft'),
        ('Trash', u'Trash'),
    )
    bookID = models.CharField(verbose_name="Book address",default='', blank=False, null=False, max_length=40)
    arID = models.CharField(verbose_name="Chapter address",default='', blank=False, null=False, max_length=43)
    title = models.CharField(verbose_name='Chapter title', default='', max_length=150)
    body = models.TextField(verbose_name='Chapter text', default='')
    word_count = models.IntegerField(verbose_name='Word count', default=0)
    created_time = models.DateTimeField(verbose_name='Created time', auto_now_add=True, editable=False)
    last_update = models.DateTimeField(verbose_name='Last update', auto_now=True, editable=False)
    coin_price = models.IntegerField(default=0)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'Chapter'
        verbose_name = 'chapter'
        verbose_name_plural = 'chapters'
