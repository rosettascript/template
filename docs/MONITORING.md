# Monitoring & Observability Guide

This guide covers the comprehensive monitoring and observability setup for the Template application.

## 📊 Monitoring Stack Overview

### Components
- **Prometheus**: Metrics collection and storage
- **Grafana**: Visualization and dashboards
- **AlertManager**: Alert management and routing
- **Node Exporter**: System metrics
- **cAdvisor**: Container metrics
- **Redis Exporter**: Redis metrics
- **PostgreSQL Exporter**: Database metrics

### Architecture
```
Application → Prometheus → Grafana
     ↓           ↓
  Metrics    AlertManager → Notifications
```

## 🚀 Quick Start

### Start Monitoring Stack
```bash
# Start main application
docker-compose up -d

# Start monitoring stack
docker-compose -f docker-compose.monitoring.yml up -d
```

### Access Points
- **Grafana**: http://localhost:3001 (admin/admin)
- **Prometheus**: http://localhost:9090
- **AlertManager**: http://localhost:9093
- **Application Metrics**: http://localhost:5000/api/metrics

## 📈 Application Metrics

### HTTP Metrics
- `http_requests_total`: Total HTTP requests by method, route, status
- `http_request_duration_seconds`: Request duration histogram
- `active_connections`: Number of active connections

### Database Metrics
- `database_connections`: Database connection pool status
- `cache_hits_total`: Cache hit counter
- `cache_misses_total`: Cache miss counter

### System Metrics
- Memory usage (RSS, heap, external)
- CPU usage
- Process uptime
- File descriptors

## 🎯 Grafana Dashboards

### Pre-built Dashboards

#### Application Dashboard
- HTTP request rates and durations
- Error rates and status codes
- Active connections
- Response time percentiles

#### System Dashboard
- CPU and memory usage
- Disk I/O
- Network traffic
- Process metrics

#### Database Dashboard
- Connection pool status
- Query performance
- Cache hit ratios
- Database size and growth

#### Infrastructure Dashboard
- Container metrics
- Service health
- Resource utilization
- Scaling indicators

### Custom Dashboards
```json
{
  "dashboard": {
    "title": "Template Application",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{method}} {{route}}"
          }
        ]
      }
    ]
  }
}
```

## 🚨 Alerting

### Alert Rules
```yaml
groups:
- name: template.rules
  rules:
  - alert: HighErrorRate
    expr: rate(http_requests_total{status_code=~"5.."}[5m]) > 0.1
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "High error rate detected"
      description: "Error rate is {{ $value }} requests per second"

  - alert: HighMemoryUsage
    expr: (process_resident_memory_bytes / 1024 / 1024) > 500
    for: 2m
    labels:
      severity: warning
    annotations:
      summary: "High memory usage"
      description: "Memory usage is {{ $value }}MB"
```

### AlertManager Configuration
```yaml
route:
  group_by: ['alertname']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 1h
  receiver: 'web.hook'

receivers:
- name: 'web.hook'
  webhook_configs:
  - url: 'http://localhost:5001/webhook'

- name: 'email'
  email_configs:
  - to: 'rosettascript@gmail.com'
    subject: 'Alert: {{ .GroupLabels.alertname }}'
```

## 🔍 Logging

### Structured Logging
```typescript
// Example log entry
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "level": "info",
  "message": "User login successful",
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "ip": "192.168.1.100",
  "userAgent": "Mozilla/5.0...",
  "duration": 245
}
```

### Log Levels
- **ERROR**: System errors, exceptions
- **WARN**: Warning conditions, slow requests
- **INFO**: General information, business events
- **DEBUG**: Detailed debugging information

### Log Aggregation
```bash
# Using ELK Stack
docker run -d --name elasticsearch -p 9200:9200 elasticsearch:7.14.0
docker run -d --name logstash -p 5044:5044 logstash:7.14.0
docker run -d --name kibana -p 5601:5601 kibana:7.14.0
```

## 📊 Performance Monitoring

### Key Performance Indicators (KPIs)

#### Application KPIs
- **Response Time**: 95th percentile < 200ms
- **Throughput**: Requests per second
- **Error Rate**: < 0.1% of total requests
- **Availability**: 99.9% uptime

#### Infrastructure KPIs
- **CPU Usage**: < 70% average
- **Memory Usage**: < 80% of allocated
- **Disk I/O**: < 1000 IOPS
- **Network Latency**: < 50ms

### Monitoring Queries
```promql
# Average response time
avg(http_request_duration_seconds)

# Error rate
rate(http_requests_total{status_code=~"5.."}[5m]) / rate(http_requests_total[5m])

# Memory usage percentage
(process_resident_memory_bytes / (1024*1024*1024)) * 100

# Database connection pool utilization
database_connections / database_connections_max * 100
```

## 🔧 Troubleshooting

### Common Issues

#### High Memory Usage
```bash
# Check memory usage
curl http://localhost:5000/api/system/info

# Analyze heap dump
node --inspect=0.0.0.0:9229 dist/index.js
```

#### Slow Queries
```sql
-- Enable query logging
ALTER SYSTEM SET log_min_duration_statement = 1000;
SELECT pg_reload_conf();

-- Check slow queries
SELECT query, mean_time, calls, total_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

#### Connection Issues
```bash
# Check database connections
psql -h localhost -U postgres -c "SELECT * FROM pg_stat_activity;"

# Check Redis connections
redis-cli info clients
```

### Health Checks
```bash
# Application health
curl http://localhost:5000/api/health

# Detailed health
curl http://localhost:5000/api/health/detailed

# Metrics endpoint
curl http://localhost:5000/api/metrics
```

## 📱 Mobile Monitoring

### Mobile App Metrics
- App crash rate
- Session duration
- User retention
- Performance metrics

### Real User Monitoring (RUM)
```javascript
// Client-side performance monitoring
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'navigation') {
      // Send to analytics
      analytics.track('page_load_time', {
        duration: entry.loadEventEnd - entry.loadEventStart
      });
    }
  }
});
observer.observe({entryTypes: ['navigation']});
```

## 🔒 Security Monitoring

### Security Metrics
- Failed login attempts
- Suspicious IP addresses
- Rate limiting triggers
- Security header violations

### Security Alerts
```yaml
- alert: BruteForceAttempt
  expr: rate(auth_failed_total[5m]) > 10
  for: 1m
  labels:
    severity: critical
  annotations:
    summary: "Brute force attack detected"
```

## 📊 Business Metrics

### Custom Metrics
```typescript
// User registration metric
const userRegistrations = new promClient.Counter({
  name: 'user_registrations_total',
  help: 'Total number of user registrations',
  labelNames: ['source'],
});

// Revenue metric
const revenue = new promClient.Gauge({
  name: 'revenue_daily',
  help: 'Daily revenue',
});
```

### Business Intelligence
- User acquisition metrics
- Conversion rates
- Revenue tracking
- Feature usage analytics

## 🎯 Best Practices

### Monitoring Best Practices
1. **Start Simple**: Begin with basic metrics and gradually add complexity
2. **Set Realistic Alerts**: Avoid alert fatigue with appropriate thresholds
3. **Monitor Business Metrics**: Track KPIs that matter to the business
4. **Regular Review**: Review and update monitoring configurations regularly
5. **Documentation**: Document alert meanings and response procedures

### Alert Best Practices
1. **Clear Naming**: Use descriptive alert names
2. **Proper Severity**: Assign appropriate severity levels
3. **Runbooks**: Create runbooks for common issues
4. **Escalation**: Define escalation procedures
5. **Testing**: Regularly test alert delivery

### Performance Best Practices
1. **Baseline Metrics**: Establish performance baselines
2. **Trend Analysis**: Monitor trends over time
3. **Capacity Planning**: Use metrics for capacity planning
4. **Load Testing**: Regular load testing with monitoring
5. **Optimization**: Use metrics to guide optimization efforts
