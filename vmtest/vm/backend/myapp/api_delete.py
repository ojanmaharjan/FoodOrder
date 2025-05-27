import psycopg2

def delete_food_data(data):
    food_id = data.get("id")  

    print("food_id:", food_id)

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

        update_query = "DELETE FROM food_items WHERE id = %s;"

        cursor.execute(update_query, (food_id,))  # ✅ fix: add comma to make it a tuple

        cursor.close()
        db_connection.close()

        context = {
            'response_status': 'success',
            'response_data': {
                'id': food_id
            }
        }
    except (Exception, psycopg2.DatabaseError) as error:
        print("Database error:", error)
        context = {
            'response_status': "fail",
            'error_message': str(error)
        }

    return context
