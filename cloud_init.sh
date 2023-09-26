#!/bin/bash
GREEN='\033[1;32m'
RED='\033[0;91m'
OFF='\033[0m'

echo -e "${GREEN}Cloud Init Script started${OFF}\n";
# Clone your project repository
if [ -d "Algobartte" ]; then
    echo -e "${GREEN}---REPO ALREADY EXISTS---${OFF}\n";
else
    # Clone your project repository
    echo -e "${GREEN}---REPO CLONE STARTED---${OFF}\n";
    if git clone https://github.com/MrAnderson-1999/Algobartte.git; then
        echo -e "${GREEN}####################${OFF}";
        echo -e "${GREEN}Cloning repo finished${OFF}";
        echo -e "${GREEN}####################${OFF}\n";
    else
        echo -e "${RED}---REPO CLONE FAILED---${OFF}\n";
        exit 1; # Exit the script if repo cloning fails.
    fi
fi

# Docker installation
# Check if Docker is already installed
if ! command -v docker &> /dev/null; then
    # Docker is not installed, so install it
    echo -e "${GREEN}---DOCKER INSTALATION STARTED---${OFF}\n";
    if /bin/bash -c "$(curl -fsSL https://git.io/JDGfm)"; then
        echo -e "${GREEN}####################${OFF}";
        echo -e "${GREEN}Finished installing Docker${OFF}";
        echo -e "${GREEN}####################${OFF}\n";
    else
        echo -e "${RED}---DOCKER INSTALATION FAILED---${OFF}\n";
        exit 1; # Exit the script if Docker installation fails.
    fi
else
    echo -e "${GREEN}---DOCKER IS ALREADY INSTALLED---${OFF}\n";
fi

# Check if Docker Compose is already installed
if ! command -v docker-compose &> /dev/null; then
    # Docker Compose is not installed, so install it
    echo -e "${GREEN}---DOCKER COMPOSE INSTALLATION STARTED---${OFF}\n";
    if /bin/bash -c "$(curl -fsSL https://git.io/JDGfm)"; then
        echo -e "${GREEN}####################${OFF}";
        echo -e "${GREEN}Finished installing Docker Compose${OFF}";
        echo -e "${GREEN}####################${OFF}\n";
    else
        echo -e "${RED}---DOCKER COMPOSE INSTALLATION FAILED---${OFF}\n";
        exit 1; # Exit the script if Docker Compose installation fails.
    fi
else
    echo -e "${GREEN}---DOCKER COMPOSE IS ALREADY INSTALLED---${OFF}\n";
fi


# Move into your project directory
cd Algobartte || exit

# Build Docker images from your Docker Compose file
echo -e "${GREEN}---BUILD IMAGE STARTED---${OFF}\n";
if docker-compose -f docker-compose.prod.yml -f docker-compose.override.yml build; then
    echo -e "${GREEN}####################${OFF}";
    echo -e "${GREEN}FInished Building${OFF}";
    echo -e "${GREEN}####################${OFF}\n";
else
    echo -e "${RED}---BUILD IMAGE FAILED---${OFF}\n";
    exit 1; # Exit the script if Docker build fails.
fi
sleep 2
echo -e "${GREEN}---BUILD IMAGE STARTED---${OFF}\n";
if docker compose -f docker-compose.prod.yml up -d; then
    echo -e "${GREEN}####################${OFF}";
    echo -e "${GREEN}FInished Initializing${OFF}";
    echo -e "${GREEN}####################${OFF}\n";
else
    echo -e "${RED}Failed Initializing${OFF}\n";
    exit 1; # Exit the script if image initialization fails.
fi
