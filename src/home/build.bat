if exist ..\..\..\build\pc\static\home\ (
rd ..\..\..\build\pc\static\home\ /s /q
)
emaop release -cmopDd ../../../build/pc -f fis-online-conf.js
