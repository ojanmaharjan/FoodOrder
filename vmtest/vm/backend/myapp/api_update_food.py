import psycopg2

import os
from datetime import datetime
from django.conf import settings

def update_food_data(data, files=None):
    food_id = data.get("id")  # Required for identifying the record to update
    food_name = data.get("name")
    food_price = data.get("price")
    food_description = data.get("description")
    image_path = None

    print("food_id:", food_id)
    print("food_name:", food_name)
    print("food_price:", food_price)
    print("food_description:", food_description)

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

        # Handle image upload if a new image is provided
        if files and 'image' in files:
            image_file = files['image']
            folder = os.path.join(settings.MEDIA_ROOT, 'food_images')
            os.makedirs(folder, exist_ok=True)
            ext = os.path.splitext(image_file.name)[1]
            filename = f"food_{food_id}_{datetime.now().strftime('%Y%m%d%H%M%S')}{ext}"
            image_save_path = os.path.join(folder, filename)
            with open(image_save_path, 'wb+') as destination:
                for chunk in image_file.chunks():
                    destination.write(chunk)
            # Store relative path for DB
            image_path = f"food_images/{filename}"

            # Update with image
            update_query = """
                UPDATE food_items
                SET name = %s, price = %s, description = %s, image = %s
                WHERE id = %s
            """
            cursor.execute(update_query, (
                food_name,
                food_price,
                food_description,
                image_path,
                food_id
            ))
        else:
            # Update without image
            update_query = """
                UPDATE food_items
                SET name = %s, price = %s, description = %s
                WHERE id = %s
            """
            cursor.execute(update_query, (
                food_name,
                food_price,
                food_description,
                food_id
            ))

        cursor.close()
        context = {
            'response_status': 'success',
            'response_data': {
                'id': food_id,
                'name': food_name,
                'price': food_price,
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
