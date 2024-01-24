# Project Title

## Overview
This application is designed to automatically categorize transactions based on a set of predefined rules. It aims to provide a user-friendly interface for users to upload and categorize their Arabic bank transactions.

## Requirements

### Frontend
- Technologies to be used: React, Next.js, Material UI, Formik, Yup.
- Key Features:
  - User-friendly interface for uploading Arabic bank transactions in CSV format.
  - File validation and upload functionality.

### Backend
- Django
- Key Features:
  - Backend system to receive and process Arabic CSV files.
  - Functionality to present categorized transactions.

## Bank Transaction Categorization Rules
The application will categorize Arabic bank transactions based on the following rules:

1. **بقالة (Groceries):**
   - Keywords: "بقالة," "سوبرماركت," "محل طعام"

2. **فواتير (Utilities):**
   - Keywords: "كهرباء," "ماء," "غاز"

3. **تناول الطعام خارج المنزل (Dining Out):**
   - Keywords: "مطعم," "كافيه," "وجبات سريعة"

4. **ترفيه (Entertainment):**
   - Keywords: "فيلم," "حفل," "فعالية"

5. **تسوق (Shopping):**
   - Keywords: "تجزئة," "ملابس," "مركز تسوق"

6. **وسائل النقل (Transportation):**
   - Keywords: "محطة وقود," "وسائل نقل عامة," "مشاركة الركوب"

7. **الرعاية الصحية (Healthcare):**
   - Keywords: "صيدلية," "طبيب," "مستشفى"

8. **تكنولوجيا (Technology):**
   - Keywords: "إلكترونيات," "برمجيات," "أجهزة"

9. **السفر (Travel):**
   - Keywords: "شركة طيران," "فندق," "تأجير سيارات"

10. **متنوع (Miscellaneous):**
    - Transactions not fitting into the above categories.

## Sample Arabic Transactions
| Transaction Date | Description       | Amount   |
| ---------------- | ----------------- | -------- |
| 01/01/2024       | بقالة الأمان      | 150.00 SAR |
| 02/01/2024       | فاتورة الكهرباء   | 200.00 SAR |
| 03/01/2024       | مطعم النيل       | 75.50 SAR  |
| ...              | ...               | ...      |

## UI Functionality
- Upload functionality for Arabic CSV files containing transaction data.
- Display summary of uploaded transactions.
- File validation.
- Button to initiate the categorization process.
- Loading state during processing.
- Display of categorized transactions with their respective categories.
- Option for users to edit or confirm the automatically assigned categories.
