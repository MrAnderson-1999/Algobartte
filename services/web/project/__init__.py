from flask import Flask, send_from_directory, render_template, request
from flask_sqlalchemy import SQLAlchemy
import logging

app = Flask(__name__)
app.config.from_object("project.config.Config")
db = SQLAlchemy(app)

# Configure the logger
log_filename = app.config["LOG_FILENAME"]
log_level = app.config["LOG_LEVEL"]

logging.basicConfig(filename=log_filename, level=log_level, format=app.config["LOG_FORMAT"], datefmt=app.config["LOG_DATE_FORMAT"])
logger = logging.getLogger(__name__)

# Log when the application starts
logger.info("Starting Flask app.")

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128), unique=True, nullable=False)
    active = db.Column(db.Boolean(), default=True, nullable=False)

    def __init__(self, email):
        self.email = email

@app.route("/static/<path:filename>")
def staticfiles(filename):
    return send_from_directory(app.config["STATIC_FOLDER"], filename)

@app.route("/")
def index():
    # Log when the index route is accessed
    logger.info("Accessing the index route.")
    return render_template("index.html")

@app.route('/receive_alert', methods=['POST'])
def receive_alert():
    # alert_data = request.get_json()  # Assuming alerts are sent as JSON
    # Process the alert data here
    return 'Alert received!'



# if __name__ == "__main__":
#     # Initialize the database and log when the connection is established
#     with app.app_context():
#         db.init_app(app)
#         db.create_all()
#         logger.info("Database connection established.")

#     # Log when specific routes are registered
#     logger.info("Registering routes.")

#     # Start the application and log success
#     logger.info("Flask app started successfully.")