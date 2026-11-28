@REM TOOL:    tv_lock.bat - Lock/unlock video apps on an Android / Google TV from a Windows PC over the same Wi-Fi
@REM FAMILY:  home-tools
@REM VERSION: 1.0.1
@REM DATE:    2026-11-28
@REM CHAT:    Publish FocusGuard and TV lock under a Utilities section on GitHub
@REM CHANGES: 1.0.1 - public edition: settings marked for each home; generic TV name
@REM          1.0.0 - first version; PC backup of tv_lock.sh (lock / unlock)
@REM STATUS:  Usage: tv_lock.bat lock   or   tv_lock.bat unlock
@echo off
setlocal
REM ---- CHANGE THESE FOR YOUR HOME ----
set ADB=C:\platform-tools\adb.exe
set TV=192.168.1.8:5555
REM Video apps to pause (find yours with:  adb shell pm list packages)
set APPS=com.google.android.youtube.tv in.startv.hotstar com.sonyliv com.amazon.amazonvideo.livingroom com.graymatrix.did com.jio.media.stb.ondemand com.netflix.ninja com.mxtech.videoplayer.television com.mitv.videoplayer com.xiaomi.mitv.mediaexplorer com.android.vending
REM Casting / screen-mirroring services to switch off while locked
set SERVICES=com.google.android.apps.mediashell com.xiaomi.mitv.smartshare com.mitv.milinkservice com.xiaomi.wfdsinkhelperservice

"%ADB%" connect %TV% >nul
if /I "%~1"=="lock" goto LOCK
if /I "%~1"=="unlock" goto UNLOCK
echo Usage: tv_lock.bat lock ^| unlock
goto END

:LOCK
for %%P in (%APPS%) do (
  "%ADB%" -s %TV% shell am force-stop %%P
  "%ADB%" -s %TV% shell pm suspend %%P | findstr /c:"state: true" >nul && echo   paused   %%P || (
    "%ADB%" -s %TV% shell pm disable-user --user 0 %%P >nul && echo   disabled %%P )
)
for %%P in (%SERVICES%) do (
  "%ADB%" -s %TV% shell am force-stop %%P
  "%ADB%" -s %TV% shell pm disable-user --user 0 %%P >nul && echo   disabled %%P
)
"%ADB%" -s %TV% shell input keyevent KEYCODE_HOME
echo TV LOCKED
goto END

:UNLOCK
for %%P in (%APPS% %SERVICES%) do (
  "%ADB%" -s %TV% shell pm unsuspend %%P >nul 2>&1
  "%ADB%" -s %TV% shell pm enable %%P >nul && echo   open     %%P
)
echo TV UNLOCKED

:END
pause
