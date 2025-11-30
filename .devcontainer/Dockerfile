FROM node:20

# Install Supabase CLI
RUN npm install -g supabase

# Install useful dev tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /workspace

# Expose Next.js dev port
EXPOSE 3000

# Keep container running
CMD ["sleep", "infinity"]
