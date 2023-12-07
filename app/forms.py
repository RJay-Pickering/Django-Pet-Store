from django import forms
from app.models import Donation


class pet_filter_form(forms.Form):
    age = forms.CharField()
    shots = forms.BooleanField()
    house_trained = forms.BooleanField()
    special_needs = forms.BooleanField()
    gender = forms.CharField()
    tag_item = forms.CharField()
    size = forms.CharField()


class Donate_Form(forms.Form):
    amount = forms.CharField(max_length=100)
    amountOther = forms.CharField(max_length=100, required=False)
    payment = forms.CharField(max_length=100)

    # class Meta:
    #     model = Donation
    #     fields = ["amount", "amountOther", "payment"]
