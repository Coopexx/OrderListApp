if not DEFINED IS_MINIMIZED set IS_MINIMIZED=1 && start "" /min "%~dpnx0" %* && exit

@ECHO OFF

ECHO Starting client web application...

CD C:\Users\acproduktion\Documents\GitHub\order-list
CD

call npm start

PAUSE

exit

