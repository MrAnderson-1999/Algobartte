# Algobartte

## Overview
This repository contains a DevOps project for Algobartte, a project that involves deploying a Flask web application using Docker and Docker Compose, along with necessary scripts and configurations.

## Project Structure
The repository is organized into the following directories and files:

- `cloud_init.sh`: A shell script used for initializing cloud instances.
- `ibkr.py`: Python script for IBKR functionality.
- `services`: Directory containing Docker service configurations.
  - `web`: Directory for the web application service.
    - `entrypoint.sh`: Entry point scripts.
    - `manage.py`: Python script for start and managing the application.
    - `project`: Application project directory.
      - `config.py`: Configuration file for the application.
      - `__init__.py`: Initialization script.
      - `static`: Directory for static assets (CSS, images, JS).
      - `templates`: HTML templates for the application.

## Getting Started
Get started with this project:
- The cloud_init.sh script executaion initialize local prod env and install Docker Compose. `bash cloud_init.sh`
- run `docker compose -f docker.compose.prod.yml down -v` and then `docker compose -f docker.compose.dev.yml up -d --build`
- Enter localhost:5001

# Contributors
