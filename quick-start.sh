#!/bin/bash

echo "🚀 Quick Start n8n Development (Unlicensed Version)"
echo "=================================================="

# Kill any existing processes
echo "🧹 Cleaning up existing processes..."
pkill -f "npm run dev" || true
pkill -f "pnpm.*dev" || true
pkill -f "turbo.*dev" || true

# Set PostgreSQL environment variables
export DB_TYPE=postgresdb
export DB_POSTGRESDB_HOST=localhost
export DB_POSTGRESDB_PORT=5432
export DB_POSTGRESDB_DATABASE=n8n
export DB_POSTGRESDB_USER=n8n
export DB_POSTGRESDB_PASSWORD=n8n-password

# n8n configuration
export N8N_HOST=0.0.0.0
export N8N_PORT=5678
export N8N_PROTOCOL=http
export NODE_ENV=development
export N8N_RELEASE_TYPE=dev

# Disable licensing and enable all features
export N8N_LICENSE_AUTO_RENEW_ENABLED=false
export N8N_PERSONALIZATION_ENABLED=true
export N8N_PUBLIC_API_ENABLED=true
export N8N_AI_ENABLED=true
export N8N_COMMUNITY_PACKAGES_ENABLED=true

echo "✅ Environment configured"
echo "📊 Database: PostgreSQL at localhost:5432"
echo "🌐 n8n will start at: http://localhost:5678"
echo ""

# Check if PostgreSQL is running
if ! docker ps | grep -q n8n-postgres; then
    echo "⚠️  PostgreSQL container not running. Starting it..."
    docker-compose up -d postgres pgadmin
    echo "⏳ Waiting for PostgreSQL to be ready..."
    sleep 8
fi

echo "🔨 Starting n8n in development mode (builds automatically)..."
echo "⏳ This will take a few minutes on first run..."
echo ""

# Start n8n in development mode - this builds and runs
npm run dev

