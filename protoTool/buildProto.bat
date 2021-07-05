@echo off
SET protoc="proto/protoc.exe"
SET protoDIr="proto\*.proto"

@REM protoc.exe --descriptor_set_out 666.pb *.proto
%protoc% --descriptor_set_out proto.pb %protoDIr%

@REM 移动到res目录下面
move proto.pb res/proto.pb
echo "build proto success=============="

pause
