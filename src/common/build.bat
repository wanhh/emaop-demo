if exist ..\..\..\build\pc\static\common\ (
rd ..\..\..\build\pc\static\common\ /s /q
)
emaop release -cmopDd ../../../build/pc -f fis-online-conf.js
