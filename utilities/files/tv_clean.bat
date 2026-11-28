@REM TOOL:    tv_clean.bat - Xiaomi Mi TV (Android TV 11) debloat / restore over Wi-Fi ADB
@REM FAMILY:  home-tools
@REM VERSION: 1.0.1
@REM DATE:    2026-11-28
@REM CHAT:    Publish FocusGuard and TV lock under a Utilities section on GitHub
@REM CHANGES: 1.0.1 - public edition: settings marked for each home; warning that the list is for Mi TVs
@REM          1.0.0 - first version; disables Xiaomi/Google bloat, "restore" re-enables all
@REM STATUS:  Usage:  tv_clean.bat          (disable list)
@REM                  tv_clean.bat restore  (re-enable list)
@echo off
setlocal
REM ---- CHANGE THESE FOR YOUR HOME ----
set ADB=C:\platform-tools\adb.exe
set TV=192.168.1.8:5555
set MODE=%~1
if "%MODE%"=="" set MODE=clean

REM Written for a Xiaomi Mi TV. Check each name exists on your TV first:  adb shell pm list packages
set PKGS=com.miui.tv.analytics com.xiaomi.statistic android.autoinstalls.config.xioami.dangal com.mitv.tvhome.mitvplus com.mitv.tvhome.michannel com.xiaomi.mitv.handbook com.xiaomi.mimusic2 com.mitv.gallery com.xm.webcontent com.google.android.tvrecommendations com.google.android.videos com.google.android.youtube.tvmusic com.google.android.play.games com.google.android.feedback

"%ADB%" connect %TV%
echo.
echo Mode: %MODE%
echo.
for %%P in (%PKGS%) do (
  if /I "%MODE%"=="restore" (
    echo Enabling  %%P
    "%ADB%" -s %TV% shell pm enable %%P
  ) else (
    echo Disabling %%P
    "%ADB%" -s %TV% shell pm disable-user --user 0 %%P
  )
)
echo.
echo Done. Reboot TV:  "%ADB%" -s %TV% reboot
pause
