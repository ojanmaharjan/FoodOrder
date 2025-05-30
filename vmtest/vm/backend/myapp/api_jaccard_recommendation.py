from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Cart
from django.contrib.auth.models import User

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def jaccard_recommendations(request):
    user = request.user
    if user.is_staff:
        return Response({'recommendations': [], 'message': 'Recommendations are only for regular users.'})
    # Get set of food names ordered by current user
    user_food_names = set(Cart.objects.filter(user=user).values_list('name', flat=True))

    similarities = []
    for other_user in User.objects.exclude(id=user.id): 
        #taking other users data
        other_food_names = set(Cart.objects.filter(user=other_user).values_list('name', flat=True))
        if not other_food_names:
            continue
        #Comparing your food choice with other
        intersection = user_food_names & other_food_names
        union = user_food_names | other_food_names
        if not union:
            continue
        score = len(intersection) / len(union)
        similarities.append((score, other_food_names))

    similarities.sort(reverse=True)
    recommended_names = set()
    for score, food_names in similarities[:3]:  # Top 3 similar users
        recommended_names |= (food_names - user_food_names)

    # Get details for recommended food names (latest price, etc.)
    recommendations = []
    for name in recommended_names:
        # Get the most recent cart entry for this food name (for price, etc.)
        item = Cart.objects.filter(name=name).order_by('-created_at').first()
        image_url = None
        description = None
        category = None
        # Try to fetch image, description, and category from food_items table
        import psycopg2
        from django.conf import settings
        try:
            db_connection = psycopg2.connect(
                host="127.0.0.1",
                database="postgres",
                user="postgres",
                password="admin",
                port="5432"
            )
            cursor = db_connection.cursor()
            cursor.execute("SELECT id, image, description, category FROM food_items WHERE name = %s ORDER BY id DESC LIMIT 1;", (name,))
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
            else:
                item_id = None
            cursor.close()
        except Exception as e:
            image_url = None
            description = None
            category = None
        if item:
            recommendations.append({
                'id': item_id,
                'name': item.name,
                'price': float(item.price),
                'image': image_url,
                'description': description,
                'category': category
            })

    # Sort recommendations by most ordered (globally) in Cart table
    from collections import Counter
    name_counts = Counter()
    for name in [rec['name'] for rec in recommendations]:
        name_counts[name] = Cart.objects.filter(name=name).count()
    recommendations.sort(key=lambda rec: name_counts[rec['name']], reverse=True)
    return Response({'recommendations': recommendations})