import json
from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import os
import mysql.connector
from slither import install_and_run_slither, extract_vulnerabilities
from fastapi.responses import JSONResponse

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Establish a MySQL database connection
db = mysql.connector.connect(
    host="localhost ",
    user="root",
    password="",
    database="bend"
)

cursor = db.cursor()

# Function to execute SQL script from a file
def execute_sql_from_file(filename):
    with open(filename, 'r') as sql_file:
        sql_statements = sql_file.read().split(';')
        for statement in sql_statements:
            if statement.strip():
                cursor.execute(statement)
                db.commit()

# Specify the path to your database.sql file
database_sql_file = 'database.sql'

# Execute the SQL script from database.sql
execute_sql_from_file(database_sql_file)

# Create the table if it doesn't exist
cursor.execute("""
CREATE TABLE IF NOT EXISTS YourTableName (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    phonenum VARCHAR(20) NOT NULL,
    pwd VARCHAR(255) NOT NULL,
    uploaded_file VARCHAR(255) NOT NULL
)
""")

uploaded_data = {}

@app.post("/api/upload/")
async def upload_file(
    name: str = Form(...),
    description: str = Form(...),
    date: str = Form(...),
    email: str = Form(...),
    phonenum: str = Form(...),
    pwd: str = Form(...),
    uploadedFile: UploadFile = File(...)
):
    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)

    file_path = os.path.join(upload_dir, uploadedFile.filename)
    with open(file_path, "wb") as f:
        f.write(uploadedFile.file.read())

    insert_query = """
    INSERT INTO YourTableName (name, description, date, email, phonenum, pwd, uploaded_file)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    data = (name, description, date, email, phonenum, pwd, file_path)
    cursor.execute(insert_query, data)
    db.commit()

    contract_path = file_path
    install_and_run_slither(contract_path)

    data = {
        "name": name,
        "description": description,
        "date": date,
        "email": email,
        "phonenum": phonenum,
        "pwd": pwd,
        "uploaded_file": file_path,
    }
    uploaded_data[uploadedFile.filename] = data

    return JSONResponse(content={"success": True, "message": "Audit completed successfully"})

@app.get("/api/retrieve/{filename}")
async def retrieve_uploaded_data(filename: str):
    if filename in uploaded_data:
        data = uploaded_data[filename]
        return JSONResponse(content=data)
    else:
        raise HTTPException(status_code=404, detail="File not found")

# Add the following route to retrieve audit history from the YourTableName table
@app.get("/api/audit-history")
async def get_audit_history():
    cursor.execute("SELECT * FROM YourTableName")
    audit_history = cursor.fetchall()

    audit_history_data = []
    for row in audit_history:
        history_record = {
            "id": row[0],
            "name": row[1],
            "description": row[2],
            "date": row[3],
            "email": row[4],
            "phonenum": row[5],
            "pwd": row[6],
            "uploaded_file": row[7]
        }
        audit_history_data.append(history_record)

    return audit_history_data

@app.post("/api/vulnerabilities") 
def post_vulnerabilities(vulnerabilities: dict):
    try:
        # Insert the vulnerabilities data into the database
        for vulnerability in vulnerabilities["vulnerabilities"]:
            insert_query = """
            INSERT INTO Vulnerabilities (vulnerability_name, impact, description)
            VALUES (%s, %s, %s)
            """
            data = (vulnerability["vulnerability_name"], vulnerability["severity"], "")
            cursor.execute(insert_query, data)
            db.commit()
        return JSONResponse(content={"success": True, "message": "Vulnerabilities data inserted successfully"})
    except mysql.connector.Error as err:
        return JSONResponse(content={"error": f"Error: {err}"})

# Modify the /api/vulnerabilities endpoint to fetch data from the "Vulnerabilities" table
@app.get("/api/vulnerabilities")
def get_vulnerabilities():
    try:
        cursor.execute("SELECT * FROM Vulnerabilities")
        vulnerabilities = cursor.fetchall()
        # Convert the result into the expected JSON format
        vulnerability_list = []
        for vulnerability in vulnerabilities:
            vulnerability_data = {
                "vulnerability_id": vulnerability[0],
                "vulnerability_name": vulnerability[1],
                "impact": vulnerability[2],
                "description": vulnerability[3]
            }
            vulnerability_list.append(vulnerability_data)
        return JSONResponse(content={"vulnerabilities": vulnerability_list})
    except mysql.connector.Error as err:
        return JSONResponse(content={"error": f"Error: {err}"})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
