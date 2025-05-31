# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from .models import Cart
# from django.contrib.auth.models import User
# from django.db.models import Sum
# from django.conf import settings

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def jaccard_recommendations(request):
#     user = request.user
#     if user.is_staff:
#         return Response({'recommendations': [], 'message': 'Recommendations are only for regular users.'})
#     # Get set of food names ordered by current user
#     user_food_names = set(Cart.objects.filter(user=user).values_list('name', flat=True))
#     if not user_food_names:
#         # New user: recommend most popular items
#         from collections import Counter
#         all_names = list(Cart.objects.values_list('name', flat=True))
#         quantity_sums = Cart.objects.values('name').annotate(total_quantity=Sum('quantity'))
#         quantity_lookup = {entry['name']: entry['total_quantity'] for entry in quantity_sums}

#         name_counts = Counter(all_names)
#         top_names = [name for name, count in name_counts.most_common(5)]
#         recommendations = []
#         for name in top_names:
#             item = Cart.objects.filter(name=name).order_by('-created_at').first()
#             image_url = None
#             description = None
#             category = None
#             item_id = None
#             # Try to fetch image, description, and category from food_items table
#             import psycopg2
#             from django.conf import settings
#             try:
#                 db_connection = psycopg2.connect(
#                     host="127.0.0.1",
#                     database="postgres",
#                     user="postgres",
#                     password="admin",
#                     port="5432"
#                 )
#                 cursor = db_connection.cursor()
#                 cursor.execute("SELECT id, image, description, category FROM food_items WHERE name = %s ORDER BY id DESC LIMIT 1;", (name,))
#                 result = cursor.fetchone()
#                 if result:
#                     id_val, image_val, description_val, category_val = result
#                     item_id = id_val
#                     if image_val:
#                         image_url = settings.MEDIA_URL + image_val
#                     if description_val:
#                         description = description_val
#                     if category_val:
#                         category = category_val
#                 cursor.close()
#             except Exception as e:
#                 image_url = None
#                 description = None
#                 category = None
#             recommendations.append({
#                 'id': item_id,
#                 'name': item.name,
#                 'price': float(item.price),
#                 'image': image_url,
#                 'description': description,
#                 'category': category
#             })
#         return Response({'recommendations': recommendations})

#     similarities = []
#     for other_user in User.objects.exclude(id=user.id): 
#         other_food_names = set(Cart.objects.filter(user=other_user).values_list('name', flat=True))
#         if not other_food_names:
#             continue
#         intersection = user_food_names & other_food_names
#         union = user_food_names | other_food_names
#         if not union:
#             continue
#         score = len(intersection) / len(union)
#         similarities.append((score, other_food_names))

#     similarities.sort(reverse=True)
#     recommended_names = set()
#     for score, food_names in similarities[:3]:  # Top 3 similar users
#         recommended_names |= (food_names - user_food_names)

#     recommendations = []
#     for name in recommended_names:
#         item = Cart.objects.filter(name=name).order_by('-created_at').first()
#         image_url = None
#         description = None
#         category = None
#         item_id = None
#         import psycopg2
#         from django.conf import settings
#         try:
#             db_connection = psycopg2.connect(
#                 host="127.0.0.1",
#                 database="postgres",
#                 user="postgres",
#                 password="admin",
#                 port="5432"
#             )
#             cursor = db_connection.cursor()
#             cursor.execute("SELECT id, image, description, category FROM food_items WHERE name = %s ORDER BY id DESC LIMIT 1;", (name,))
#             result = cursor.fetchone()
#             if result:
#                 id_val, image_val, description_val, category_val = result
#                 item_id = id_val
#                 if image_val:
#                     image_url = settings.MEDIA_URL + image_val
#                 if description_val:
#                     description = description_val
#                 if category_val:
#                     category = category_val
#             cursor.close()
#         except Exception as e:
#             image_url = None
#             description = None
#             category = None
#         recommendations.append({
#             'id': item_id,
#             'name': item.name,
#             'price': float(item.price),
#             'image': image_url,
#             'description': description,
#             'category': category
#         })
#     return Response({'recommendations': recommendations})

#     similarities = []
#     for other_user in User.objects.exclude(id=user.id): 
#         #taking other users data
#         other_food_names = set(Cart.objects.filter(user=other_user).values_list('name', flat=True))
#         if not other_food_names:
#             continue
#         #Comparing your food choice with other
#         intersection = user_food_names & other_food_names
#         union = user_food_names | other_food_names
#         if not union:
#             continue
#         score = len(intersection) / len(union)
#         similarities.append((score, other_food_names))

#     similarities.sort(reverse=True)
#     recommended_names = set()
#     for score, food_names in similarities[:3]:  # Top 3 similar users
#         recommended_names |= (food_names - user_food_names)

#     # Get details for recommended food names (latest price, etc.)
#     recommendations = []
#     for name in recommended_names:
#         # Get the most recent cart entry for this food name (for price, etc.)
#         item = Cart.objects.filter(name=name).order_by('-created_at').first()
#         image_url = None
#         description = None
#         category = None
#         # Try to fetch image, description, and category from food_items table
#         import psycopg2
#         from django.conf import settings
#         try:
#             db_connection = psycopg2.connect(
#                 host="127.0.0.1",
#                 database="postgres",
#                 user="postgres",
#                 password="admin",
#                 port="5432"
#             )
#             cursor = db_connection.cursor()
#             cursor.execute("SELECT id, image, description, category FROM food_items WHERE name = %s ORDER BY id DESC LIMIT 1;", (name,))
#             result = cursor.fetchone()
#             if result:
#                 id_val, image_val, description_val, category_val = result
#                 item_id = id_val
#                 if image_val:
#                     image_url = settings.MEDIA_URL + image_val
#                 if description_val:
#                     description = description_val
#                 if category_val:
#                     category = category_val
#             else:
#                 item_id = None
#             cursor.close()
#         except Exception as e:
#             image_url = None
#             description = None
#             category = None
#         if item:
#             recommendations.append({
#                 'id': item_id,
#                 'name': item.name,
#                 'price': float(item.price),
#                 'image': image_url,
#                 'description': description,
#                 'category': category
#             })

#     # Sort recommendations by most ordered (globally) in Cart table
#     from collections import Counter
#     name_counts = Counter()
#     for name in [rec['name'] for rec in recommendations]:
#         name_counts[name] = Cart.objects.filter(name=name).count()
#     recommendations.sort(key=lambda rec: name_counts[rec['name']], reverse=True)
#     return Response({'recommendations': recommendations})

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Cart
from django.contrib.auth.models import User
from django.db.models import Sum  # ✅ Added to calculate total quantity
from collections import Counter  # ✅ Added to count how many times food was ordered
import psycopg2
from django.conf import settings

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def jaccard_recommendations(request):
    user = request.user

    if user.is_staff:
        return Response({'recommendations': [], 'message': 'Recommendations are only for regular users.'})

    user_food_names = set(Cart.objects.filter(user=user).values_list('name', flat=True))

    # Case for new user (no previous orders)
    if not user_food_names:
        all_names = list(Cart.objects.values_list('name', flat=True))
        name_counts = Counter(all_names)  # How many times each food was ordered (number of orders)
        quantity_sums = Cart.objects.values('name').annotate(total_quantity=Sum('quantity'))  # Total quantity per food
        quantity_lookup = {entry['name']: entry['total_quantity'] for entry in quantity_sums}  # Quick lookup

        # Sort foods first by times_ordered, then by total_quantity, descending
        foods_with_counts = [
            (name, name_counts[name], quantity_lookup.get(name, 0))
            for name in name_counts.keys()
        ]
        foods_with_counts.sort(key=lambda x: (x[1], x[2]), reverse=True)
        top_names = [name for name, _, _ in foods_with_counts[:5]]  # Top 5 by order count, then quantity

        recommendations = []
        for name in top_names:
            item = Cart.objects.filter(name=name).order_by('-created_at').first()
            image_url = None
            description = None
            category = None
            item_id = None
            try:
                db_connection = psycopg2.connect(
                    host="127.0.0.1",
                    database="postgres",
                    user="postgres",
                    password="admin",
                    port="5432"
                )
                cursor = db_connection.cursor()
                cursor.execute(
                    "SELECT id, image, description, category FROM food_items WHERE name = %s ORDER BY id DESC LIMIT 1;",
                    (name,))
                result = cursor.fetchone()
                if result:
                    id_val, image_val, description_val, category_val = result
                    item_id = id_val
                    if image_val:
                        image_url = settings.MEDIA_URL + image_val
                    if description_val:
                        description = description_val
                    if category_val:
                        category = category_val
                cursor.close()
            except Exception as e:
                pass

            recommendations.append({
                'id': item_id,
                'name': item.name,
                'price': float(item.price),
                'image': image_url,
                'description': description,
                'category': category,
                'times_ordered': name_counts[name],  # number of orders
                'total_quantity': quantity_lookup.get(name, 0)  # total quantity ordered
            })
        return Response({'recommendations': recommendations})

    # Case for existing user with Jaccard similarity
    similarities = []
    for other_user in User.objects.exclude(id=user.id):
        other_food_names = set(Cart.objects.filter(user=other_user).values_list('name', flat=True))
        if not other_food_names:
            continue
        intersection = user_food_names & other_food_names
        union = user_food_names | other_food_names
        if not union:
            continue
        score = len(intersection) / len(union)
        similarities.append((score, other_food_names))

    similarities.sort(reverse=True)

    recommended_names = set()
    for score, food_names in similarities[:3]:  # ✅ Top 3 similar users
        recommended_names |= (food_names - user_food_names)

    name_counts = Counter(Cart.objects.values_list('name', flat=True))  # ✅ Count how many times each food was ordered

    quantity_sums = Cart.objects.values('name').annotate(total_quantity=Sum('quantity'))  # ✅ Total quantity per food
    quantity_lookup = {entry['name']: entry['total_quantity'] for entry in quantity_sums}  # ✅ Quick lookup

    recommendations = []
    for name in recommended_names:
        item = Cart.objects.filter(name=name).order_by('-created_at').first()
        if not item:
            continue

        image_url = None
        description = None
        category = None
        item_id = None

        try:
            db_connection = psycopg2.connect(
                host="127.0.0.1",
                database="postgres",
                user="postgres",
                password="admin",
                port="5432"
            )
            cursor = db_connection.cursor()
            cursor.execute(
                "SELECT id, image, description, category FROM food_items WHERE name = %s ORDER BY id DESC LIMIT 1;",
                (name,))
            result = cursor.fetchone()
            if result:
                id_val, image_val, description_val, category_val = result
                item_id = id_val
                if image_val:
                    image_url = settings.MEDIA_URL + image_val
                if description_val:
                    description = description_val
                if category_val:
                    category = category_val
            cursor.close()
        except Exception as e:
            pass

        recommendations.append({
            'id': item_id,
            'name': item.name,
            'price': float(item.price),
            'image': image_url,
            'description': description,
            'category': category,
            'times_ordered': name_counts[name],  # ✅ Added number of times ordered
            'total_quantity': quantity_lookup.get(name, 0)  # ✅ Added total quantity ordered
        })

    recommendations.sort(key=lambda rec: name_counts[rec['name']], reverse=True)  # ✅ Sort by most ordered

    return Response({'recommendations': recommendations})
