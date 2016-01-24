from django.shortcuts import render
from django.http import JsonResponse, Http404
from getdata.models import Gene

def create_response(data):
    results = [ record.as_dict() for record in data ]
    return JsonResponse({'response': 'success', 'results': results})

def get_name(request, name):
    if request.is_ajax() != True:
        raise Http404

    return create_response(Gene.objects.filter(name__startswith=name).order_by('name'))


def get_chrom(request, chrom):
    if request.is_ajax() != True:
        raise Http404

    return create_response(Gene.objects.filter(chrom__startswith=chrom).order_by('chrom'))
