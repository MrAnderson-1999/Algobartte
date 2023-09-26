from flask import Flask, send_from_directory, render_template, request
import psycopg2
import logging

app = Flask(__name__)
app.config.from_object("project.config.Config")
# Configure the logger
log_filename = app.config["LOG_FILENAME"]
log_level = app.config["LOG_LEVEL"]

logging.basicConfig(filename=log_filename, level=log_level, format=app.config["LOG_FORMAT"], datefmt=app.config["LOG_DATE_FORMAT"])
logger = logging.getLogger(__name__)

# Log when the application starts
logger.info("Starting Flask app.")

# Connect to the database
conn = psycopg2.connect(
    host=app.config["DB_HOST"],
    database="my_pg_db",
    user="db_admin",
    password="password"
)

@app.route("/static/<path:filename>")
def staticfiles(filename):
    return send_from_directory(app.config["STATIC_FOLDER"], filename)

@app.route("/")
def index():
    # Log when the index route is accessed
    logger.info("Accessing the index route.")
    return render_template("index.html")

@app.route("/evaluate")
def evaluate():
    # Log when the index route is accessed
    logger.info("Accessing the /evaluate route.")
    return render_template("evaluate.html")


@app.route('/emotion_result', methods=['POST'])
def create():
    # Get the username and email from the request body
    angry = request.form.get('angry')
    sad = request.form.get('sad')
    happy = request.form.get('happy')
    disgust = request.form.get('disgust')
    surprise = request.form.get('surprise')

    # Insert the data into the database
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO emotion (angry,sad,happy,disgust,surprise) VALUES (%s, %s, %s, %s, %s)", (angry,sad,happy,disgust,surprise))
    conn.commit()
 
    return 'User created successfully!'
