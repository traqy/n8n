#!/bin/bash

echo "🚀 Starting n8n with PostgreSQL (All Features Unlicensed)"
echo "=================================================="

# Start PostgreSQL first
echo "📊 Starting PostgreSQL..."
docker-compose up -d postgres

# Wait for PostgreSQL to be healthy
echo "⏳ Waiting for PostgreSQL to be ready..."
while ! docker-compose exec postgres pg_isready -U n8n -d n8n > /dev/null 2>&1; do
    echo "   PostgreSQL is not ready yet..."
    sleep 2
done
echo "✅ PostgreSQL is ready!"

# Start pgAdmin
echo "🔧 Starting pgAdmin..."
docker-compose up -d pgadmin

# Build and start n8n
echo "🔨 Building and starting n8n..."
docker-compose up -d --build n8n

echo ""
echo "🎉 Services started successfully!"
echo ""
echo "📖 Access URLs:"
echo "   🌐 n8n Web Interface: http://localhost:5678"
echo "   🗄️  pgAdmin (Database UI): http://localhost:8081"
echo "   📊 PostgreSQL Direct: localhost:5432"
echo ""
echo "🔐 Default Credentials:"
echo "   pgAdmin: admin@n8n.local / admin"
echo "   PostgreSQL: n8n / n8n-password"
echo ""
echo "📋 Useful Commands:"
echo "   docker-compose logs -f n8n     # View n8n logs"
echo "   docker-compose logs -f postgres # View PostgreSQL logs"
echo "   docker-compose ps              # Check service status"
echo "   docker-compose down            # Stop all services"
echo ""
echo "⚠️  Note: All Enterprise features are unlicensed and available!"

