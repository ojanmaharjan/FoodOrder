import psycopg2

import os
from datetime import datetime

def quiz(data, files=None):
    food_name = data.get("name")
    food_price = data.get("price")
    food_category = data.get("category")
    food_description = data.get("description")
    image_path = None

    # Handle image upload
    if files and 'image' in files:
        image_file = files['image']
        # Save image to global MEDIA_ROOT/food_images
        from django.conf import settings
        folder = os.path.join(settings.MEDIA_ROOT, 'food_images')
        os.makedirs(folder, exist_ok=True)
        # Unique filename
        ext = os.path.splitext(image_file.name)[1]
        filename = f"{food_name}_{datetime.now().strftime('%Y%m%d%H%M%S')}{ext}"
        save_path = os.path.join(folder, filename)
        with open(save_path, 'wb+') as dest:
            for chunk in image_file.chunks():
                dest.write(chunk)
        image_path = f"food_images/{filename}"
        print("Saved image to:", save_path)

    print("food_name:", food_name)
    print("food_price:", food_price)
    print("food_category:", food_category)
    print("food_description:", food_description)
    print("image_path:", image_path)

    try:
        db_connection = psycopg2.connect(
            host="127.0.0.1",
            database="postgres",
            user="postgres",
            password="admin",
            port="5432"
        )
        db_connection.autocommit = True
        cursor = db_connection.cursor()

        if image_path:
            insert_query = """
                INSERT INTO food_items (name, price, description, category, image)
                VALUES (%s, %s, %s, %s, %s)
            """
            cursor.execute(insert_query, (food_name, food_price, food_description, food_category, image_path))
        else:
            insert_query = """
                INSERT INTO food_items (name, price, description, category)
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(insert_query, (food_name, food_price, food_description, food_category))

        cursor.close()
        context = {
            'response_status': 'success',
            'response_data': {
                'name': food_name,
                'price': food_price,
                'category': food_category,
                'description': food_description,
                'image': image_path
            }
        }
    except (Exception, psycopg2.DatabaseError) as error:
        print("Database error:", error)
        context = {
            'response_status': "fail",
            'error_message': str(error)
        }

    return context
