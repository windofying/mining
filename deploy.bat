@echo off
echo ========================================
echo Mining Depot USA - IONOS 部署脚本
echo 专门解决SSL证书问题
echo ========================================
echo.

echo 正在准备部署文件...
echo.

REM 创建部署目录
if not exist "deploy" mkdir deploy

REM 复制所有必要文件到部署目录
echo 复制 HTML 文件...
copy "*.html" "deploy\"

echo 复制配置文件...
copy "nginx.conf" "deploy\"
copy "_config.yml" "deploy\"

echo 复制 CSS 目录...
xcopy "css" "deploy\css\" /E /I /Y

echo 复制 JS 目录...
xcopy "js" "deploy\js\" /E /I /Y

echo 复制图片目录...
xcopy "images" "deploy\images\" /E /I /Y

echo 复制SSL诊断工具...
copy "ssl-test.html" "deploy\"
copy "nginx-ssl-guide.html" "deploy\"

echo 复制文档...
copy "IONOS_DEPLOYMENT.md" "deploy\"
copy "SSL_CONFIGURATION.md" "deploy\"
copy "SSL_TROUBLESHOOTING.md" "deploy\"

echo.
echo ========================================
echo 部署文件准备完成！
echo ========================================
echo.
echo 部署目录: deploy\
echo.
echo 重要提示:
echo 1. 您的服务器使用 Nginx，不是 Apache
echo 2. 需要配置 nginx.conf 文件而不是 .htaccess
echo 3. 使用 Let's Encrypt 获取SSL证书
echo 4. 将 deploy\ 目录中的文件上传到 /var/www/html/
echo 5. 上传完成后访问 https://www.mining-depot.com/nginx-ssl-guide.html 查看配置指南
echo.
echo 建议使用 FTP 客户端如 FileZilla 进行上传
echo.
pause