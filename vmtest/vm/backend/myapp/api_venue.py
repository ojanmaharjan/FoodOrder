import psycopg2
from decimal import Decimal

def api_venue_list(request):
    try:
        db_connection = psycopg2.connect(
            host="127.0.0.1",
            database="postgres",
            user="postgres",
            password="admin",
            port="5432"
        )
        cursor = db_connection.cursor()

        bulk_qurey = """select  * from food_items fi order by id desc ;

"""
        cursor.execute(bulk_qurey,)
        results = cursor.fetchall()
        colnames = [desc[0] for desc in cursor.description]
        food_items = []
        for row in results:
            item = dict(zip(colnames, row))
            # Convert Decimal to float for JSON serialization
            for k, v in item.items():
                if isinstance(v, Decimal):
                    item[k] = float(v)
            food_items.append(item)
        print('----------------------')
        print(food_items)
        print('----------------------')

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        food_items = []

    context = {
        'Bulky': food_items,
    }
    return context
