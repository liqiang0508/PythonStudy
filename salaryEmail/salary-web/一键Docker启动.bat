@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

echo [1/3] 检查 Docker 是否可用...
docker version >nul 2>&1
if errorlevel 1 (
  echo Docker 未安装或未启动，请先打开 Docker Desktop，再双击本文件。
  pause
  exit /b 1
)

set "HOSTPORT=3001"
if exist ".env" (
  for /f "usebackq eol=# tokens=1,* delims==" %%a in (".env") do (
    if /i "%%a"=="WEB_PUBLISH_PORT" set "HOSTPORT=%%b"
  )
)

echo [2/3] 构建并启动容器（首次构建需要几分钟）...
docker compose up -d --build
if errorlevel 1 (
  echo 启动失败，请查看上面的错误信息。
  pause
  exit /b 1
)

echo [3/3] 打开浏览器 http://localhost:%HOSTPORT%
start "" "http://localhost:%HOSTPORT%"

echo.
docker compose ps
echo.
echo 访问地址: http://localhost:%HOSTPORT%
echo 查看日志: docker compose logs -f
echo 停止服务: docker compose down
pause
