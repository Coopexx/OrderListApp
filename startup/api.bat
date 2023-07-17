if not DEFINED IS_MINIMIZED set IS_MINIMIZED=1 && start "" /min "%~dpnx0" %* && exit

@ECHO OFF

ECHO Starting API...

CD C:\Users\acproduktion\Documents\GitHub\order-list\windows
CD

call node run .\server.js

PAUSE

exit

