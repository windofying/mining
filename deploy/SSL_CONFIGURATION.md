# IONOS SSL 配置文档

## 概述

本文档详细说明了如何在IONOS服务器上配置SSL证书，解决SSL协议错误和连接问题。

## SSL证书配置

### 1. 激活SSL证书

#### 在IONOS控制面板中：
1. 登录IONOS控制面板
2. 进入"域名和SSL"部分
3. 选择域名 `mining-depot.com`
4. 点击"激活SSL证书"
5. 选择"Let's Encrypt"免费证书
6. 确认激活

#### 等待时间：
- 通常5-30分钟
- 最多24小时

### 2. 验证证书状态

检查证书是否已正确激活：
- ✅ "已激活" - 证书正常
- ⏳ "激活中" - 等待完成
- ❌ "未激活" - 需要激活
- ⚠️ "过期" - 需要续期

## .htaccess 配置

### 文件位置
```
/public_html/.htaccess
```

### 文件权限
```
644 (rw-r--r--)
```

### 主要配置内容

```apache
# 强制 HTTPS 重定向 (IONOS 优化版)
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP:X-Forwarded-Proto} !https [OR]
RewriteCond %{SERVER_PORT} 80
RewriteRule ^(.*)$ https://www.mining-depot.com/$1 [R=301,L]

# 强制 www 子域名
RewriteCond %{HTTP_HOST} ^mining-depot\.com$ [NC]
RewriteRule ^(.*)$ https://www.mining-depot.com/$1 [R=301,L]

# 处理IONOS临时域名重定向
RewriteCond %{HTTP_HOST} ^s[0-9]+\.onlinehome\.us$ [NC]
RewriteRule ^(.*)$ https://www.mining-depot.com/$1 [R=301,L]
```

## 域名配置

### DNS记录设置

#### A记录
```
类型: A
名称: @
值: [IONOS服务器IP地址]
TTL: 3600
```

#### CNAME记录
```
类型: CNAME
名称: www
值: mining-depot.com
TTL: 3600
```

### 验证DNS解析

使用在线工具验证：
- https://www.whatsmydns.net/
- 输入 `mining-depot.com` 检查A记录
- 输入 `www.mining-depot.com` 检查CNAME记录

## 文件上传

### 1. 准备文件
```bash
# 运行部署脚本
deploy.bat
```

### 2. 上传到服务器
使用FTP客户端（如FileZilla）：
1. 连接到IONOS服务器
2. 导航到网站根目录
3. 上传 `deploy\` 目录中的所有文件
4. 保持目录结构完整

### 3. 设置文件权限
```
.htaccess 文件: 644
HTML 文件: 644
CSS 文件: 644
JS 文件: 644
目录: 755
```

## 测试和验证

### 1. 基本测试
- 访问 `https://www.mining-depot.com`
- 检查地址栏是否显示安全锁图标
- 测试 `http://mining-depot.com` 重定向

### 2. 诊断工具
- 访问 `https://www.mining-depot.com/ssl-test.html`
- 查看详细的SSL状态报告
- 使用SSL Labs测试: https://www.ssllabs.com/ssltest/

### 3. 浏览器测试
- 清除浏览器缓存
- 使用隐私模式访问
- 尝试不同浏览器

## 常见问题解决

### 问题1: ERR_SSL_PROTOCOL_ERROR
**原因:** SSL证书未激活或配置错误
**解决方案:**
1. 检查IONOS控制面板中的SSL状态
2. 重新激活SSL证书
3. 等待证书生效

### 问题2: 重定向不工作
**原因:** .htaccess文件配置问题
**解决方案:**
1. 检查.htaccess文件是否正确上传
2. 确认文件权限为644
3. 检查Apache mod_rewrite模块

### 问题3: 混合内容错误
**原因:** 页面包含HTTP资源
**解决方案:**
1. 确保所有资源都使用HTTPS
2. 检查图片和CSS文件路径
3. 更新.htaccess文件

### 问题4: 证书链不完整
**原因:** 中间证书缺失
**解决方案:**
1. 在IONOS控制面板中重新申请证书
2. 等待证书完全激活
3. 检查证书链完整性

## 安全头配置

### HSTS头
```apache
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains" env=HTTPS
```

### CSP头
```apache
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self';" env=HTTPS
```

### 其他安全头
```apache
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
```

## 性能优化

### GZIP压缩
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/javascript
</IfModule>
```

### 缓存设置
```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 year"
</IfModule>
```

## 监控和维护

### 定期检查
- 监控SSL证书有效期
- 检查网站正常运行
- 更新内容时保持文件结构
- 定期备份网站文件

### 证书续期
Let's Encrypt证书每90天自动续期，但需要确保：
- 域名解析正常
- 服务器配置正确
- 自动续期功能启用

## 联系支持

如果遇到技术问题，请联系：

**IONOS技术支持**
- 电话: 1-855-463-4667
- 在线支持: IONOS控制面板
- 邮箱: support@ionos.com

**提供信息**
- 域名: mining-depot.com
- 错误信息截图
- 已尝试的解决步骤
- 服务器配置信息

---

**重要提示**: SSL证书激活可能需要一些时间，请耐心等待。如果24小时后问题仍然存在，请联系IONOS技术支持。
