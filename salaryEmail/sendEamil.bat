@echo off
SET fileName=%1
if defined fileName (
    echo export file %fileName% 
    @REM 参数isTest( 是否是测试模式) 0 就是正式发送邮件，1 就是只打印邮件内容
    call sendSalaryEmail.py %fileName%  0
) else ( echo "Usage: run.bat <fileName>" )


Pause