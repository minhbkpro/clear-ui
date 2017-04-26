#!/bin/bash

# go to source dir
cd Sites/clear-ui/

# run grunt
is_grunt_runing=$(ps -A | grep '[0-9].[0-9][0-9].[0-9][0-9].grunt' | wc -l)

if [ $is_grunt_runing == 0 ]
  then
    grunt watch &
fi

# run jekyll
is_jekyll_runing=$(ps -A | grep '[j]ekyll serve' | wc -l)

if [ $is_jekyll_runing == 0 ]
  then
    cd docs/
    jekyll serve &
fi

# open sourcetree
/usr/bin/osascript -e "tell application \"SourceTree\"" -e "activate" -e "delay 1" -e "tell application \"System Events\"" -e "keystroke \"q\" using {command down}" -e "end tell" -e "end tell"
sleep 1
/usr/bin/osascript -e "tell application \"SourceTree\"" -e "activate" -e "delay 1" -e "tell application \"System Events\"" -e "keystroke \"w\" using {option down, command down}" -e "end tell" -e "end tell"
open -a SourceTree /Users/minhbkpro/Sites/clear-ui
/usr/bin/osascript -e "tell application \"SourceTree\"" -e "activate" -e "delay 1" -e "tell application \"System Events\"" -e "keystroke \"f\" using {control down, command down}" -e "end tell" -e "end tell"
sleep 1


# open sublime text
/usr/bin/osascript -e "tell application \"Sublime Text\"" -e "activate" -e "delay 1" -e "tell application \"System Events\"" -e "keystroke \"w\" using {option down, command down}" -e "end tell" -e "end tell"
sleep 1
/usr/bin/osascript -e "tell application \"Sublime Text\"" -e "activate" -e "delay 1" -e "tell application \"System Events\"" -e "keystroke \"w\" using {shift down, command down}" -e "end tell" -e "end tell"
/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl /Users/minhbkpro/Sites/clear-ui
/usr/bin/osascript -e "tell application \"Sublime Text\"" -e "activate" -e "delay 1" -e "tell application \"System Events\"" -e "keystroke \"f\" using {control down, command down}" -e "end tell" -e "end tell"
sleep 1

# open chrome
/usr/bin/open -a "/Applications/Google Chrome.app" 'http://localhost:4000'
