@echo off
SET protoc="proto/protoc.exe"
SET protoDIr="proto\*.proto"

%protoc%   %protoDIr% --python_out=./python

@REM move  proto\*.py   .\python
echo "build python proto success=============="

pause
