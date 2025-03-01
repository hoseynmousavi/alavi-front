#!/bin/bash
source .env
sed -i "s~NAME~$REACT_APP_NAME~g" build/index.html
sed -i "s~DESCRIPTION~$REACT_APP_DESCRIPTION~g" build/index.html
sed -i "s~THEME_COLOR~$REACT_APP_THEME_COLOR~g" build/index.html
sed -i "s~IMAGE~$REACT_APP_IMAGE~g" build/index.html
sed -i "s~VERSION~$REACT_APP_VERSION~g" build/index.html
sed -i "s~PRECONNECT1~$REACT_APP_PRECONNECT1~g" build/index.html
sed -i "s~PRECONNECT2~$REACT_APP_PRECONNECT2~g" build/index.html

sed -i "s~APP_TITLE~$REACT_APP_APP_TITLE~g" build/manifest.json
sed -i "s~DESCRIPTION~$REACT_APP_DESCRIPTION~g" build/manifest.json
sed -i "s~THEME_COLOR~$REACT_APP_THEME_COLOR~g" build/manifest.json
sed -i "s~BACKGROUND_COLOR~$REACT_APP_BACKGROUND_COLOR~g" build/manifest.json
sed -i "s~VERSION~$REACT_APP_VERSION~g" build/manifest.json

echo "POST BUILD SUCCESSFULLY"
