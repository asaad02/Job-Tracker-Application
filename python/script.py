import json
import os
import mysql.connector
from mysql.connector import Error
from datetime import datetime

# Connect to the database
def connect_to_db():
    db_config = {
        'host': os.getenv('DB_HOST', 'localhost'),
        'database': os.getenv('DB_DATABASE', 'template_db'),
        'user': os.getenv('DB_USER', 'root'),
        'password': os.getenv('DB_PASSWORD', 'pwd')
    }
    connection = mysql.connector.connect(**db_config)
    return connection

# Custom JSON serializer for objects not serializable by default json code
def json_serializer(obj):
    """JSON serializer for objects not serializable by default json code"""
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f"Object of type {obj.__class__.__name__} is not JSON serializable")

def export_data_to_json(connection):
    cursor = connection.cursor(dictionary=True)
    query = "SELECT * FROM job"
    cursor.execute(query)
    result = cursor.fetchall()
    with open('export/job.json', 'w') as json_file:
        # Use the default parameter to specify the custom serializer function
        json.dump(result, json_file, default=json_serializer)
    cursor.close()


# Fetch data from import directory and write to database
def import_data_from_json(connection):
    try: # Check if the file exists
        with open('import/job.json', 'r') as json_file:
            data = json.load(json_file)
            
            # Prepare a list for batch insert
            values_to_insert = []
            for row in data:
                job_id = row.get('id')
                job_title = row.get('job_title')
                company = row.get('company')
                company_url = row.get('company_url')
                status = row.get('status')
                application_date = row.get('application_date')
                application_password = row.get('application_password')
                notes = row.get('notes')
                
                # Add tuple to the list
                values_to_insert.append((job_id, job_title, company, company_url, status, application_date, application_password, notes))
        
        # Perform the insertion in batch
        try:
            cursor = connection.cursor()
            query = "INSERT INTO job (id, job_title, company, company_url, status, application_date, application_password, notes) VALUES (%s, %s, %s, %s, %s, %s, %s, %s) ON DUPLICATE KEY UPDATE job_title=VALUES(job_title), company=VALUES(company), company_url=VALUES(company_url), status=VALUES(status), application_date=VALUES(application_date), application_password=VALUES(application_password), notes=VALUES(notes)"
            cursor.executemany(query, values_to_insert)
            connection.commit()
            print(f"Inserted {cursor.rowcount} rows.")
        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            cursor.close()
    except FileNotFoundError:
        print("File not found.")

# Main function
def main():
    connection = None  # Initialize connection to None
    try:
        connection = mysql.connector.connect(
            host=os.getenv('DB_HOST', 'localhost'),
            database=os.getenv('DB_DATABASE', 'template_db'),
            user=os.getenv('DB_USER', 'root'),
            password=os.getenv('DB_PASSWORD', 'pwd')
        )
    # ask the user if want to export or import data
        print("Do you want to export or import data?")
        print("1. Export data")
        print("2. Import data")
        choice = input("Enter your choice: ")
        if choice == '1':
            export_data_to_json(connection)
        elif choice == '2':
            import_data_from_json(connection)
        else:
            print("Invalid choice.")

    except Error as e:
        print(e)
    finally:
        # Only attempt to close if connection was successfully created
        if connection and connection.is_connected():
            connection.close()

if __name__ == "__main__":
    main()
