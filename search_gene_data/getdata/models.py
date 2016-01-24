from __future__ import unicode_literals

from django.db import models
from django.core.urlresolvers import reverse

class Gene(models.Model):
    name = models.CharField(max_length=32)
    chrom = models.CharField(max_length=32)
    txEnd = models.PositiveIntegerField()
    txStart = models.PositiveIntegerField()
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created']

    def __unicode__(self):
        return u'%s' % self.name

    def as_dict(self):
        return {
            "name": self.name,
            "chrom": self.chrom,
            "txEnd": self.txEnd,
            "txStart": self.txStart,
            "created": self.created,
        }

    def get_absolute_url(self):
        return reverse('getdata.views.gene', args=[self.name])
