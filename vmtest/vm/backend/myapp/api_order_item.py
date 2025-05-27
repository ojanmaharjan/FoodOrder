# import psycopg2

# def checkout(data):
#     food_name = data.get("name")
#     food_price =data.get("price")
#     food_quantity = data.get("quantity")
    

#     print("food_name:",food_name)
#     print("food_price:",food_price)
#     print("food_quantity:",food_quantity)

#     try:
#         db_connection = psycopg2.connect(
#             host="127.0.0.1",
#             database="postgres",
#             user="postgres",
#             password="admin",
#             port="5432"

#         )
#         db_connection.autocommit = True
#         cursor = db_connection.cursor()

#         insert_query = """
#             INSERT INTO Cart(name, price, description)
#             VALUES (%s, %s, %s)
#         """
#         cursor.execute(insert_query, (food_name, food_price, food_quantity))

#         cursor.close()
#         context = {
#             'response_status': 'success',
#             'response_data': {
#                 'name': food_name,
#                 'price': food_price,
#                 'quantity':food_quantity
#             }
#         }

#     except (Exception, psycopg2.DatabaseError) as error:
#         print("Database error:", error)
#         context = {
#             'response_status': "fail",
#             'error_message': str(error)
#         }

#     return context

# app/views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Cart

# @api_view(['POST'])
@permission_classes([IsAuthenticated])
def checkout(request):
    user = request.user
    print(f'Authenticated User: {user}')   # 🔥 user from token. is takenn form token
    order_list = request.data.get('order', [])

    for item in order_list:
        name = item.get('name')
        price = item.get('price')
        quantity = item.get('quantity')

        Cart.objects.create(
            username=user.username,  # 🔥 username saved
            name=name,
            price=price,
            quantity=quantity
        )

    return Response({"message": "Order placed successfully"})

