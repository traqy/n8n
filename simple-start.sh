#!/bin/bash

echo "🚀 Simple n8n Start (Direct CLI)"
echo "================================"

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

# Disable licensing
export N8N_LICENSE_AUTO_RENEW_ENABLED=false

echo "✅ Environment configured"

# Check if PostgreSQL is running
if ! docker ps | grep -q n8n-postgres; then
    echo "⚠️  PostgreSQL container not running. Starting it..."
    docker-compose up -d postgres pgadmin
    echo "⏳ Waiting for PostgreSQL to be ready..."
    sleep 5
fi

echo "🔨 Building minimal required packages..."

# Build only what we absolutely need
pnpm --filter="@n8n/config" build
pnpm --filter="@n8n/constants" build
pnpm --filter="@n8n/db" build
pnpm --filter="n8n-workflow" build
pnpm --filter="n8n-core" build
pnpm --filter="n8n" build

echo "🚀 Starting n8n CLI directly..."
cd packages/cli/bin && ./n8n start
