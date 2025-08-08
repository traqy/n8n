# n8n Development Setup - All Features Unlicensed

This guide will help you run n8n in development mode with all Enterprise features unlicensed using PostgreSQL in Docker.

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose installed
- At least 4GB RAM available
- Ports 5678, 5432, and 8081 available

### Deploy with Docker Compose

1. **Clone and navigate to the repository:**
   ```bash
   git clone <your-repo-url>
   cd n8n
   ```

2. **Start the services:**
   ```bash
   docker-compose up -d
   ```

3. **Access n8n:**
   - n8n Web Interface: http://localhost:5678
   - pgAdmin (Database UI): http://localhost:8081 (admin@n8n.local/admin)
   - PostgreSQL Direct: localhost:5432

### Services Included

- **n8n**: Main workflow automation application
- **PostgreSQL**: Primary database for storing workflows, executions, and user data
- **pgAdmin**: Web-based PostgreSQL administration interface

## 🔧 Configuration

### Environment Variables

Key configuration options in `docker-compose.yml`:

```yaml
# Database
- DB_TYPE=postgresdb
- DB_POSTGRESDB_HOST=postgres
- DB_POSTGRESDB_PORT=5432
- DB_POSTGRESDB_DATABASE=n8n
- DB_POSTGRESDB_USER=n8n
- DB_POSTGRESDB_PASSWORD=n8n-password

# Security
- N8N_ENCRYPTION_KEY=n8n-encryption-key-change-this-in-production
- N8N_USER_MANAGEMENT_JWT_SECRET=my-jwt-secret-change-this-in-production

# Features (All Enabled - No Licensing Required)
- N8N_AI_ENABLED=true
- N8N_COMMUNITY_PACKAGES_ENABLED=true
- N8N_VERSIONING_ENABLED=true
- N8N_EXTERNAL_SECRETS_ENABLED=true
- N8N_WORKFLOW_HISTORY_ENABLED=true
```

### Custom Configuration

To customize the deployment:

1. **Edit `docker-compose.yml`** to modify environment variables
2. **Change default passwords** for security
3. **Update volume mappings** if needed

## 🔐 Security Notes

**⚠️ IMPORTANT FOR PRODUCTION:**

1. **Change default passwords:**
   ```yaml
   # PostgreSQL
   - POSTGRES_PASSWORD=your-secure-password

   # n8n
   - N8N_ENCRYPTION_KEY=your-32-character-encryption-key
   - N8N_USER_MANAGEMENT_JWT_SECRET=your-jwt-secret

   # pgAdmin
   - PGADMIN_DEFAULT_PASSWORD=your-admin-password
   ```

2. **Enable HTTPS** in production
3. **Use external secrets management** for sensitive data
4. **Limit network access** using Docker networks and firewall rules

## 📋 Available Features

All n8n features are now available without licensing:

### ✅ Authentication & Security
- LDAP authentication
- SAML authentication
- OIDC authentication
- Multi-factor authentication (MFA)
- Advanced permissions
- API key scopes

### ✅ Workflow Management
- Advanced execution filters
- Workflow history and versioning
- Source control integration
- External secrets management
- Variables management
- Folders organization
- Debug in editor

### ✅ Enterprise Features
- Multiple main instances
- Worker view
- Binary data S3 storage
- Log streaming
- AI assistant features
- Custom npm registries
- Project roles (Admin/Editor/Viewer)

### ✅ Analytics & Insights
- Insights dashboard
- Execution analytics
- Performance monitoring

## 🛠 Management Commands

### Start Services
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
# All services
docker-compose logs -f

# Just n8n
docker-compose logs -f n8n

# Just PostgreSQL
docker-compose logs -f postgres
```

### Update n8n
```bash
# Rebuild and restart n8n
docker-compose up -d --build n8n
```

### Backup Data
```bash
# Create PostgreSQL backup
docker exec n8n-postgres pg_dump -U n8n -d n8n > n8n-backup.sql

# Or create a full database dump
docker exec n8n-postgres pg_dumpall -U n8n > n8n-full-backup.sql
```

### Restore Data
```bash
# Restore from backup
docker exec -i n8n-postgres psql -U n8n -d n8n < n8n-backup.sql

# Or restore full database
docker exec -i n8n-postgres psql -U n8n < n8n-full-backup.sql
```

## 🔧 Troubleshooting

### Common Issues

1. **Port conflicts:**
   - Change ports in `docker-compose.yml` if 5678, 27017, or 8081 are in use

2. **PostgreSQL connection issues:**
   - Check if PostgreSQL container is running: `docker ps`
   - Verify connection settings in n8n environment variables
   - Check PostgreSQL logs: `docker-compose logs postgres`

3. **Build failures:**
   - Ensure you have enough disk space (>10GB)
   - Try building with more memory: `docker-compose build --memory=4g`

4. **Permission issues:**
   - Check volume permissions: `docker-compose exec n8n ls -la /home/node/.n8n`

### Logs and Debugging

```bash
# Check container status
docker-compose ps

# View container logs
docker-compose logs n8n

# Access n8n container shell
docker-compose exec n8n sh

# Access PostgreSQL shell
docker-compose exec postgres psql -U n8n -d n8n
```

## 📚 Additional Resources

- [n8n Documentation](https://docs.n8n.io/)
- [Docker Documentation](https://docs.docker.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🎉 What's Different

This deployment removes all licensing restrictions from n8n:

- ✅ All Enterprise features are enabled by default
- ✅ No license keys required
- ✅ No usage limitations
- ✅ All authentication methods available
- ✅ Full API access without restrictions
- ✅ All advanced workflow features unlocked

Enjoy your fully unlicensed n8n deployment! 🚀
