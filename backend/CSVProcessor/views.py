from django.shortcuts import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime

from .models import Transaction

import json


@csrf_exempt
def handle_transactions(request):
    if request.method != "POST":
        return JsonResponse({"error": "Unsupported request required."}, status=400)

    try:
        data = json.loads(request.body)
        transactions = data["transactions"]

        for t in transactions:
            transaction_date = datetime.strptime(
                t["transactionDate"], "%d/%m/%Y"
            ).date()
            description = t["description"]
            amount = t["amount"]
            category = categorize_transaction(description)

            Transaction.objects.create(
                transactionDate=transaction_date,
                description=description,
                amount=amount,
                category=category,
            )

            return JsonResponse({"status": "success"})

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid request body."}, status=400)


def categorize_transaction(description):
    categories = {
        "Groceries": ["بقالة", "سوبرماركت", "محل طعام"],
        "Utilities": ["كهرباء", "ماء", "غاز"],
        "Dining Out": ["مطعم", "كافيه", "وجبات سريعة"],
        "Entertainment": ["فيلم", "حفل", "فعالية"],
        "Shopping": ["تجزئة", "ملابس", "مركز تسوق"],
        "Transportation": ["محطة وقود", "وسائل نقل عامة", "مشاركة الركوب"],
        "Healthcare": ["صيدلية", "طبيب", "مستشفى"],
        "Technology": ["إلكترونيات", "برمجيات", "أجهزة"],
        "Travel": ["شركة طيران", "فندق", "تأجير سيارات"],
    }

    for category, keywords in categories.items():
        for keyword in keywords:
            if keyword in description:
                return category

    return "Miscellaneous"


# Example Usage:
# transaction = Transaction.objects.get(id=1)
# transaction.category = categorize_transaction(transaction.description)
# transaction.save()
