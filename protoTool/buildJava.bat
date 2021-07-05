@echo off
SET protoc="proto/protoc.exe"
SET protoDIr="proto\*.proto"

%protoc%   %protoDIr%  --java_out=./java

@REM move  proto\*.java   .\java
echo "build java proto success=============="

pause
