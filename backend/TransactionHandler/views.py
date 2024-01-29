from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime

from .models import Transaction

import json


@csrf_exempt
def save_transactions(request):
    if request.method != "POST":
        return JsonResponse({"error": "Unsupported request method."}, status=400)

    try:
        data = json.loads(request.body)
        transactions = data.get("transactions", [])

        for t in transactions:
            try:
                transaction_date = datetime.strptime(
                    t["transactionDate"], "%d/%m/%Y"
                ).date()
                description = t["description"]
                amount = t["amount"]
                category = categorize_transaction(description)

                transaction = Transaction(
                    transactionDate=transaction_date,
                    description=description,
                    amount=amount,
                    category=category,
                )

                transaction.save()

            except KeyError as e:
                return JsonResponse(
                    {"error": f"Missing field in transaction data: {e}"}, status=400
                )
            except ValueError as e:
                return JsonResponse(
                    {"error": f"Incorrect date format: {e}"}, status=400
                )

        return JsonResponse({"status": "success"})

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON in request body."}, status=400)


def categorize_transaction(description):
    """
    Categorizes a transaction based on its description.

    Parameters:
    description (str): The description of the transaction.

    Returns:
    str: The category of the transaction.

    Categories:
    - Groceries
    - Utilities
    - Dining Out
    - Entertainment
    - Shopping
    - Transportation
    - Healthcare
    - Technology
    - Travel

    If the description does not match any category, it is categorized as "Miscellaneous".
    """
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


@csrf_exempt
def get_transactions_by_category(request, category):
    if request.method != "GET":
        return JsonResponse({"error": "GET request required."}, status=405)

    transactions = Transaction.objects.filter(category=category)
    if not transactions:
        return JsonResponse(
            {"error": "No transactions found in this category."}, status=404
        )

    transactions_data = [
        {
            "transactionDate": transaction.transactionDate.strftime("%d/%m/%Y"),
            "description": transaction.description,
            "amount": transaction.amount,
            "category": transaction.category,
        }
        for transaction in transactions
    ]

    return JsonResponse({"transactions": transactions_data})


@csrf_exempt
def get_all_transactions(request):
    if request.method != "GET":
        return JsonResponse({"error": "GET request required."}, status=405)

    transactions = Transaction.objects.all()

    if not transactions:
        return JsonResponse({"error": "No transactions found."}, status=404)

    transactions_data = [
        {
            "transactionDate": transaction.transactionDate.strftime("%d/%m/%Y"),
            "description": transaction.description,
            "amount": transaction.amount,
            "category": transaction.category,
        }
        for transaction in transactions
    ]

    return JsonResponse({"transactions": transactions_data})
