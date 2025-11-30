FROM node:20

# Install Supabase CLI
RUN npm install -g supabase

# Create app directory
WORKDIR /app

# Copy only package files first for caching
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Expose Next.js dev port
EXPOSE 3000

CMD ["npm", "run", "dev"]
