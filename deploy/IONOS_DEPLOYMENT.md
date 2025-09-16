# IONOS 部署指南 - Mining Depot USA, Inc.

## 概述

本指南将帮助您将 Mining Depot USA, Inc. 官方网站部署到 IONOS 服务器，并配置SSL证书解决连接问题。

## 部署前准备

### 1. 文件准备
确保以下文件已准备好：
- 所有 HTML 文件 (index.html, about.html, services.html, projects.html, qualifications.html, contact.html)
- CSS 样式文件 (css/ 目录)
- JavaScript 文件 (js/ 目录)
- 图片资源 (images/ 目录)
- 配置文件 (.htaccess, _config.yml)
- 错误页面 (404.html)

### 2. IONOS 账户设置
- 确保您有 IONOS 托管账户
- 域名 www.mining-depot.com 已注册并指向 IONOS 服务器
- 获取 FTP/SFTP 访问凭据

## 部署步骤

### 步骤 1: 运行部署脚本
```bash
# 在项目根目录运行
deploy.bat
```

这将创建 `deploy\` 目录并复制所有必要文件。

### 步骤 2: 激活SSL证书

#### 2.1 登录IONOS控制面板
1. 访问 https://www.ionos.com/
2. 使用您的账户凭据登录
3. 选择您的托管套餐

#### 2.2 配置SSL证书
1. 进入"域名和SSL"部分
2. 选择域名 `mining-depot.com`
3. 找到"SSL证书"选项
4. 点击"激活SSL证书"
5. 选择"Let's Encrypt"免费证书
6. 确认激活

#### 2.3 等待证书激活
- 通常需要5-30分钟
- 最多可能需要24小时
- 在等待期间不要修改域名设置

### 步骤 3: 上传文件

#### 3.1 使用FTP客户端
推荐使用FileZilla：

1. **连接设置**
   - 主机: 您的IONOS服务器地址
   - 用户名: 您的FTP用户名
   - 密码: 您的FTP密码
   - 端口: 21 (FTP) 或 22 (SFTP)

2. **上传文件**
   - 连接到服务器
   - 导航到网站根目录 (通常是 `public_html` 或 `htdocs`)
   - 上传 `deploy\` 目录中的所有文件
   - 保持目录结构完整

#### 3.2 设置文件权限
确保以下文件权限正确：
- 所有 HTML 文件: 644
- 所有目录: 755
- .htaccess 文件: 644

### 步骤 4: 配置域名

#### 4.1 检查域名状态
1. 在IONOS控制面板中确认域名状态为"活跃"
2. 检查域名是否指向正确的服务器

#### 4.2 设置DNS记录
确保以下DNS记录正确配置：
```
A 记录: @ → 服务器IP
CNAME 记录: www → mining-depot.com
```

#### 4.3 验证DNS解析
使用在线工具验证：
- 访问 https://www.whatsmydns.net/
- 输入 `mining-depot.com` 检查A记录
- 输入 `www.mining-depot.com` 检查CNAME记录

### 步骤 5: 测试部署

#### 5.1 基本功能测试
- [ ] 访问 https://www.mining-depot.com
- [ ] 检查所有页面是否正常加载
- [ ] 验证导航菜单功能
- [ ] 测试响应式设计

#### 5.2 SSL功能测试
- [ ] 检查地址栏是否显示安全锁图标
- [ ] 测试 http://mining-depot.com 重定向到HTTPS
- [ ] 使用SSL测试工具: https://www.mining-depot.com/ssl-test.html
- [ ] 使用SSL Labs测试: https://www.ssllabs.com/ssltest/

#### 5.3 功能测试
- [ ] 项目页面图片模态框
- [ ] 资质证书页面图片放大
- [ ] 联系表单提交
- [ ] 移动端导航菜单

## 配置说明

### .htaccess 文件功能
- 强制 HTTPS 重定向
- 强制 www 子域名
- 移除 .html 扩展名
- 启用 GZIP 压缩
- 设置缓存头
- 安全头设置
- 错误页面处理

### 域名重定向规则
- `mining-depot.com` → `https://www.mining-depot.com`
- `http://` → `https://`
- 移除所有 URL 中的 `.html` 扩展名

## 故障排除

### 常见问题

#### 1. SSL证书问题
**症状:** 网站显示"不安全"或"ERR_SSL_PROTOCOL_ERROR"
**解决方案:**
- 检查IONOS控制面板中的SSL证书状态
- 重新激活SSL证书
- 等待证书完全生效

#### 2. 重定向不工作
**症状:** HTTP不重定向到HTTPS
**解决方案:**
- 检查.htaccess文件是否正确上传
- 确认文件权限为644
- 检查Apache mod_rewrite模块是否启用

#### 3. 404错误
**症状:** 页面显示404错误
**解决方案:**
- 检查.htaccess文件是否正确上传
- 确认文件权限设置
- 检查文件路径是否正确

#### 4. 混合内容错误
**症状:** 页面部分内容不显示
**解决方案:**
- 确保所有资源都使用HTTPS
- 检查图片和CSS文件路径
- 更新.htaccess文件

### 诊断工具

#### 1. SSL测试页面
访问 `https://www.mining-depot.com/ssl-test.html`
- 查看详细的SSL状态报告
- 检查重定向是否正常工作
- 获取修复建议

#### 2. IONOS SSL指南
访问 `https://www.mining-depot.com/ionos-ssl-guide.html`
- 完整的SSL配置指南
- 逐步解决方案
- 常见问题解答

#### 3. 在线SSL测试
- SSL Labs测试: https://www.ssllabs.com/ssltest/
- SSL检查器: https://www.sslshopper.com/ssl-checker.html

## 维护说明

### 定期检查
- 监控网站正常运行
- 检查 SSL 证书有效期
- 更新内容时保持文件结构
- 定期备份网站文件

### 更新内容
1. 在本地修改文件
2. 运行 `deploy.bat` 脚本
3. 通过 FTP 上传到服务器
4. 清除浏览器缓存测试
5. 验证所有功能正常

### 安全建议
1. 定期更新所有文件
2. 使用强密码保护 FTP 账户
3. 定期备份网站数据
4. 监控网站访问日志
5. 及时更新 SSL 证书

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

**部署完成后，您的网站将在 https://www.mining-depot.com 上正常运行。**

© 2024 Mining Depot USA, Inc. All rights reserved.
