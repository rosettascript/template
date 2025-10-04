# Deployment Guide

This guide covers various deployment strategies for the Template application.

## 🐳 Docker Deployment

### Prerequisites
- Docker and Docker Compose installed
- At least 4GB RAM available
- Ports 80, 5000, 5432, 6379 available

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd template

# Copy environment files
cp server/.env.example server/.env
cp client/.env.example client/.env

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

### Services Included
- **Client**: React application (port 80)
- **Server**: Express.js API (port 5000)
- **PostgreSQL**: Database (port 5432)
- **Redis**: Cache (port 6379)
- **Nginx**: Reverse proxy (port 8080)

### Development Mode
```bash
# Start with development configuration
docker-compose -f docker-compose.dev.yml up -d
```

### With Monitoring
```bash
# Start with full monitoring stack
docker-compose -f docker-compose.yml -f docker-compose.monitoring.yml up -d
```

## ☁️ Cloud Deployment

### AWS Deployment

#### Using ECS
1. **Build and push images**:
```bash
# Build and tag images
docker build -f Dockerfile.client -t your-account.dkr.ecr.region.amazonaws.com/template-client:latest .
docker build -f Dockerfile.server -t your-account.dkr.ecr.region.amazonaws.com/template-server:latest .

# Push to ECR
aws ecr get-login-password --region region | docker login --username AWS --password-stdin your-account.dkr.ecr.region.amazonaws.com
docker push your-account.dkr.ecr.region.amazonaws.com/template-client:latest
docker push your-account.dkr.ecr.region.amazonaws.com/template-server:latest
```

2. **Create ECS task definition**
3. **Set up RDS PostgreSQL instance**
4. **Configure ElastiCache Redis**
5. **Deploy using ECS service**

#### Using Elastic Beanstalk
```bash
# Install EB CLI
pip install awsebcli

# Initialize EB application
eb init template-app --platform node.js --region us-east-1

# Create environment
eb create production

# Deploy
eb deploy
```

### Google Cloud Platform

#### Using Cloud Run
```bash
# Build and push to GCR
gcloud builds submit --tag gcr.io/PROJECT-ID/template-server
gcloud builds submit --tag gcr.io/PROJECT-ID/template-client

# Deploy to Cloud Run
gcloud run deploy template-server --image gcr.io/PROJECT-ID/template-server --platform managed --region us-central1
gcloud run deploy template-client --image gcr.io/PROJECT-ID/template-client --platform managed --region us-central1
```

### Azure Deployment

#### Using Container Instances
```bash
# Build and push to ACR
az acr build --registry myregistry --image template-server .
az acr build --registry myregistry --image template-client .

# Deploy container group
az container create --resource-group myResourceGroup --name template-app --image myregistry.azurecr.io/template-server --dns-name-label template-app
```

## 🚀 Production Deployment

### Environment Configuration

#### Server Environment Variables
```env
NODE_ENV=production
PG_HOST=your-db-host
PG_DATABASE=template_db
PG_USER=your-db-user
PG_PASSWORD=your-secure-password
JWT_SECRET=your-super-secure-jwt-secret
REDIS_HOST=your-redis-host
SMTP_FROM=noreply@yourdomain.com
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
```

#### Client Environment Variables
```env
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=Your App Name
VITE_APP_VERSION=1.0.0
VITE_NODE_ENV=production
```

### SSL/TLS Configuration

#### Using Let's Encrypt
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

#### Using Cloudflare
1. Add your domain to Cloudflare
2. Update DNS records to point to your server
3. Enable SSL/TLS encryption mode
4. Configure page rules for caching

### Database Setup

#### PostgreSQL Production Setup
```sql
-- Create production database
CREATE DATABASE template_db_prod;

-- Create production user
CREATE USER template_user WITH PASSWORD 'secure_password';

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE template_db_prod TO template_user;

-- Run migrations
\c template_db_prod
\i /path/to/main-schema.sql
\i /path/to/extensions.sql
\i /path/to/functions.sql
\i /path/to/triggers.sql
\i /path/to/indexes.sql
```

### Monitoring Setup

#### Prometheus Configuration
```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'template-server'
    static_configs:
      - targets: ['your-server:5000']
    metrics_path: '/api/metrics'
```

#### Grafana Dashboards
1. Import Node.js application dashboard
2. Configure PostgreSQL dashboard
3. Set up Redis monitoring
4. Create custom business metrics dashboard

## 🔧 Maintenance

### Backup Strategy
```bash
# Database backup
pg_dump -h your-db-host -U your-user template_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -h $DB_HOST -U $DB_USER $DB_NAME > /backups/backup_$DATE.sql
aws s3 cp /backups/backup_$DATE.sql s3://your-backup-bucket/
```

### Log Management
```bash
# Rotate logs with logrotate
/var/log/template/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 root root
}
```

### Health Checks
```bash
# Application health check
curl -f http://your-server:5000/api/health || exit 1

# Database health check
pg_isready -h your-db-host -p 5432 || exit 1

# Redis health check
redis-cli -h your-redis-host ping || exit 1
```

## 📊 Performance Optimization

### Database Optimization
- Enable connection pooling
- Create appropriate indexes
- Regular VACUUM and ANALYZE
- Monitor slow queries

### Application Optimization
- Enable gzip compression
- Configure caching headers
- Use CDN for static assets
- Implement request caching

### Infrastructure Optimization
- Use load balancers for high availability
- Implement auto-scaling
- Configure monitoring and alerting
- Set up disaster recovery

## 🔒 Security Considerations

### Production Security Checklist
- [ ] Change all default passwords
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall rules
- [ ] Set up intrusion detection
- [ ] Regular security updates
- [ ] Backup encryption
- [ ] Access logging
- [ ] Rate limiting
- [ ] Input validation
- [ ] SQL injection prevention
