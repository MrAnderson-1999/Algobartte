import os
import logging

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    # Database configuration
    STATIC_FOLDER = f"{os.getenv('APP_FOLDER')}/project/static"
    DB_HOST = os.getenv('DB_HOST')
    POSTGRES_USER = os.getenv('POSTGRES_USER')
    POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
    POSTGRES_DB = os.getenv('POSTGRES_DB')

    # Logging configuration
    LOG_LEVEL = logging.INFO  # Set your desired log level
    LOG_FILENAME = "app.log"  # Set your log file name
    
    # Define the log format
    LOG_FORMAT = "%(asctime)s [%(levelname)s] %(message)s"
    LOG_DATE_FORMAT = "%Y-%m-%d %H:%M:%S"