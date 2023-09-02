import os
import logging

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite://")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    STATIC_FOLDER = f"{os.getenv('APP_FOLDER')}/project/static"
    
    # Logging configuration
    LOG_LEVEL = logging.INFO  # Set your desired log level
    LOG_FILENAME = "app.log"  # Set your log file name
    
    # Define the log format
    LOG_FORMAT = "%(asctime)s [%(levelname)s] %(message)s"
    LOG_DATE_FORMAT = "%Y-%m-%d %H:%M:%S"
