#!/bin/bash

echo "🚀 Starting n8n in Development Mode (Host) with PostgreSQL (Docker)"
echo "===================================================================="

# Set environment variables for n8n development
export DB_TYPE=postgresdb
export DB_POSTGRESDB_HOST=localhost
export DB_POSTGRESDB_PORT=5432
export DB_POSTGRESDB_DATABASE=n8n
export DB_POSTGRESDB_USER=n8n
export DB_POSTGRESDB_PASSWORD=n8n-password

export N8N_HOST=0.0.0.0
export N8N_PORT=5678
export N8N_PROTOCOL=http
export WEBHOOK_URL=http://localhost:5678/

export NODE_ENV=development
export N8N_RELEASE_TYPE=dev
export N8N_LOG_LEVEL=debug
export N8N_LOG_OUTPUT=console

# Enable all features (no licensing required)
export N8N_PERSONALIZATION_ENABLED=true
export N8N_VERSION_NOTIFICATIONS_ENABLED=true
export N8N_TEMPLATES_ENABLED=true
export N8N_PUBLIC_API_ENABLED=true
export N8N_AI_ENABLED=true
export N8N_COMMUNITY_PACKAGES_ENABLED=true
export N8N_VERSIONING_ENABLED=true
export N8N_EXTERNAL_SECRETS_ENABLED=true
export N8N_WORKFLOW_HISTORY_ENABLED=true

export N8N_SECURE_COOKIE=false
export N8N_ENCRYPTION_KEY=n8n-dev-encryption-key
export N8N_USER_MANAGEMENT_JWT_SECRET=n8n-dev-jwt-secret
export N8N_DEFAULT_BINARY_DATA_MODE=filesystem
export N8N_LICENSE_AUTO_RENEW_ENABLED=false

echo "✅ Environment variables set"
echo "📊 Database: PostgreSQL at localhost:5432"
echo "🌐 n8n will start at: http://localhost:5678"
echo ""

# Check if PostgreSQL is running
if ! docker ps | grep -q n8n-postgres; then
    echo "⚠️  PostgreSQL container not running. Starting it..."
    docker-compose up -d postgres pgadmin
    echo "⏳ Waiting for PostgreSQL to be ready..."
    sleep 5
fi

echo "🔨 Installing dependencies and starting n8n..."
echo ""

# Run n8n in development mode
npm run dev

