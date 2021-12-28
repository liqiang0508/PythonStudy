@echo off
SET protoc="protoc.exe"
SET protoDIr="proto\*.proto"

%protoc%   %protoDIr% --python_out=./pythonpb

@REM move  proto\*.py   .\python
echo "build python proto success=============="

pause
