from django.http import HttpRequest
from django.shortcuts import render
from app.forms import *


def home_page(request: HttpRequest) -> render:
    return render(request, "index.html")

def local_centers(request: HttpRequest) -> render:
    return render(request, "local_centers.html")

def search_animal(request: HttpRequest, animal: str) -> render:
    return render(request, "search.html", {"animal": animal})

def filter_pets(request: HttpRequest) -> render:
    form = pet_filter_form(request.GET)
    if form.is_valid():
        context = {"age": 1, "shots": True, "house_trained": True, "special_needs": True, "gender": "Female", "tags": ["Tag"], "size": "Small"}
        return render(request, "filter.html", context)
    return render(request, "filter.html")