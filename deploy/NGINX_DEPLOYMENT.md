# Nginx 部署指南 - Mining Depot USA, Inc.

## 重要说明

**您的服务器使用 Nginx 而不是 Apache！**

这意味着：
- ❌ .htaccess 文件在 Nginx 中不起作用
- ✅ 需要使用 nginx.conf 配置文件
- ✅ SSL 配置在 server 块中设置
- ✅ 重定向规则使用 return 指令

## 部署步骤

### 步骤 1: 获取SSL证书

#### 使用 Let's Encrypt (推荐)
```bash
# 安装 certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# 获取SSL证书
sudo certbot --nginx -d mining-depot.com -d www.mining-depot.com

# 测试自动续期
sudo certbot renew --dry-run
```

#### 手动配置证书
如果您有证书文件：
1. 将证书文件上传到服务器
2. 在 nginx.conf 中指定证书路径
3. 重启 Nginx 服务

### 步骤 2: 配置Nginx

#### 2.1 上传配置文件
将提供的 `nginx.conf` 文件上传到：
```
/etc/nginx/sites-available/mining-depot.com
```

#### 2.2 启用站点
```bash
# 创建软链接
sudo ln -s /etc/nginx/sites-available/mining-depot.com /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启Nginx
sudo systemctl restart nginx
```

#### 2.3 更新证书路径
在 nginx.conf 中更新证书路径：
```nginx
ssl_certificate /etc/letsencrypt/live/mining-depot.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/mining-depot.com/privkey.pem;
```

### 步骤 3: 上传网站文件

#### 3.1 准备文件
```bash
# 运行部署脚本
deploy.bat
```

#### 3.2 上传到服务器
```bash
# 使用SCP上传
scp -r deploy/* user@your-server:/var/www/html/

# 或使用SFTP
sftp user@your-server
put -r deploy/* /var/www/html/
```

#### 3.3 设置文件权限
```bash
# 设置正确的权限
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/
```

### 步骤 4: 测试配置

#### 4.1 基本测试
- 访问 `https://www.mining-depot.com`
- 检查地址栏是否显示安全锁图标
- 测试 `http://mining-depot.com` 重定向

#### 4.2 使用诊断工具
- 访问 `https://www.mining-depot.com/ssl-test.html`
- 查看详细的SSL状态报告
- 使用SSL Labs测试: https://www.ssllabs.com/ssltest/

#### 4.3 检查Nginx日志
```bash
# 查看错误日志
sudo tail -f /var/log/nginx/error.log

# 查看访问日志
sudo tail -f /var/log/nginx/access.log
```

## Nginx 配置说明

### 主要配置内容

```nginx
# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name mining-depot.com www.mining-depot.com;
    return 301 https://www.mining-depot.com$request_uri;
}

# HTTPS 配置
server {
    listen 443 ssl http2;
    server_name www.mining-depot.com;
    
    # SSL证书配置
    ssl_certificate /etc/letsencrypt/live/mining-depot.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mining-depot.com/privkey.pem;
    
    # 网站根目录
    root /var/www/html;
    index index.html;
    
    # 移除.html扩展名
    location / {
        try_files $uri $uri.html $uri/ =404;
    }
}
```

### SSL 配置优化

```nginx
# SSL协议和加密套件
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
ssl_prefer_server_ciphers on;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 10m;
```

### 安全头设置

```nginx
# 安全头
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header X-Content-Type-Options nosniff always;
add_header X-Frame-Options DENY always;
add_header X-XSS-Protection "1; mode=block" always;
```

## 常见问题解决

### 问题1: SSL证书错误
**症状:** 显示证书错误或无法建立SSL连接
**解决方案:**
```bash
# 检查证书
sudo openssl x509 -in /etc/letsencrypt/live/mining-depot.com/fullchain.pem -text -noout

# 重新获取证书
sudo certbot --nginx -d mining-depot.com -d www.mining-depot.com
```

### 问题2: 重定向不工作
**症状:** HTTP不重定向到HTTPS
**解决方案:**
1. 检查 nginx.conf 配置
2. 确保 server 块配置正确
3. 重启 Nginx 服务

### 问题3: 403 Forbidden 错误
**症状:** 页面显示403错误
**解决方案:**
```bash
# 检查文件权限
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/
```

### 问题4: 404错误
**症状:** 页面显示404错误
**解决方案:**
1. 检查文件是否上传到正确目录
2. 检查 nginx.conf 中的 root 路径
3. 检查 try_files 配置

## 性能优化

### GZIP压缩
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_comp_level 6;
gzip_types text/plain text/css application/javascript application/json;
```

### 缓存设置
```nginx
location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 监控和维护

### 定期检查
```bash
# 检查Nginx状态
sudo systemctl status nginx

# 检查SSL证书有效期
sudo certbot certificates

# 检查错误日志
sudo tail -f /var/log/nginx/error.log
```

### 自动续期
Let's Encrypt证书每90天自动续期，但需要确保：
```bash
# 测试自动续期
sudo certbot renew --dry-run

# 设置定时任务
sudo crontab -e
# 添加: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 检查清单

- [ ] SSL证书已正确安装和配置
- [ ] nginx.conf 文件已上传并配置正确
- [ ] 站点已启用 (sites-enabled 软链接)
- [ ] Nginx配置测试通过 (nginx -t)
- [ ] Nginx服务已重启
- [ ] 网站文件已上传到正确目录
- [ ] 文件权限设置正确 (www-data:www-data)
- [ ] HTTPS访问正常，显示安全锁图标
- [ ] HTTP自动重定向到HTTPS

## 联系支持

如果遇到技术问题，请检查：
- Nginx错误日志: `sudo tail -f /var/log/nginx/error.log`
- SSL证书状态: `sudo certbot certificates`
- Nginx配置测试: `sudo nginx -t`
- 服务状态: `sudo systemctl status nginx`

---

**重要提示**: Nginx配置与Apache完全不同，请按照本指南进行配置。
