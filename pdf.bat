set CWD=%cd%

start chrome ^
  --headless ^
  --disable-gpu ^
  -print-to-pdf=%CWD%\resume.pdf ^
  %CWD%\resume.html