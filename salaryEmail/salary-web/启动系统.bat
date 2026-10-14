@echo off
chcp 65001 >nul
cd /d %~dp0
title 工资条发送系统

if not exist node_modules (
    echo 首次运行，正在安装依赖，请稍候...
    call npm install
)
if not exist dist (
    echo 正在构建前端...
    call npm run build
)

echo 正在启动服务，浏览器访问 http://localhost:3001
start "" http://localhost:3001
call npm run start
pause
