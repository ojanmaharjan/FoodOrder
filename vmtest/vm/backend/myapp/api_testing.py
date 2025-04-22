import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

def get_king_floorsheets(request):
    try:
        db_connection = sqlite3.connect(BASE_DIR / 'db.sqlite3')
        cursor = db_connection.cursor()

        floorsheet_query = "SELECT * FROM auth_user;"
        cursor.execute(floorsheet_query)
        results = cursor.fetchall()

        print('----------------------')
        print(results)
        print('----------------------')

    except (Exception, sqlite3.DatabaseError) as error:
        print(error)
        results = []

    context = {
        'content': results,
    }
    return context
