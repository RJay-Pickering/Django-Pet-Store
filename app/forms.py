from django import forms


class pet_filter_form(forms.Form):
    age = forms.CharField()
    shots = forms.BooleanField()
    house_trained = forms.BooleanField()
    special_needs = forms.BooleanField()
    gender = forms.CharField()
    tag_item = forms.CharField()
    size = forms.CharField()