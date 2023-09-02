# Navigate to your desired directory (e.g., /var/www)
cd /var/www

# Clone your project repository
echo "Cloning your project repository..."
git clone https://MrAnderson-1999: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@github.com/MrAnderson-1999/Algobartte.git

# Move into your project directory
cd Algobartte

# Docker installation
/bin/bash -c "$(curl -fsSL https://git.io/JDGfm)"
sudo su -l $USER # check if this can be done

# Build Docker images from your Docker Compose file
echo "Building and starting Docker images..."
sleep 3
docker compose -f docker-compose.prod.yml up -d --build
