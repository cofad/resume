@echo off

setlocal enabledelayedexpansion

set OUTPUT_DIRECTORY=dist
if not exist %OUTPUT_DIRECTORY% mkdir %OUTPUT_DIRECTORY%

set CWD=%cd%
set VERSION_SEARCH_STRING=name=""version""

for /f "tokens=*" %%i in ('findstr "%VERSION_SEARCH_STRING%" resume.html') do ( 
  set version=%%i
)

set version=!version:meta=!
set version=!version:name=!
set version=!version:"version"=!
set version=!version:content=!
set version=!version:/^>=!
set version=!version:^<=!
set version=!version:"=!
set version=!version: =!

call :replaceEqualSign in version with 

start chrome ^
  --headless ^
  --disable-gpu ^
  --print-to-pdf=%CWD%\%OUTPUT_DIRECTORY%\resume-%version%.pdf ^
  %CWD%\resume.html

exit /B

:replaceEqualSign in <variable> with <newString>
  set "_s=!%~2!#"
  set "_r="

  :_replaceEqualSign
      for /F "tokens=1* delims==" %%A in ("%_s%") do (
          if not defined _r ( set "_r=%%A" ) else ( set "_r=%_r%%~4%%A" )
          set "_s=%%B"
      )
  if defined _s goto _replaceEqualSign

  set "%~2=%_r:~0,-1%"
exit /B
