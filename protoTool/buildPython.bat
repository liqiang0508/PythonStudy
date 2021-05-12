@echo off
SET protoc="proto/protoc.exe"
SET protoDIr="proto\*.proto"

%protoc%   %protoDIr% --python_out=./

move  proto\*.py   .\
echo "build python proto success=============="

pause
