THEME=${SC_THEME:-default}

if [ ! -d src/themes/$THEME ]; then
  echo "Theme Folder src/themes/${THEME} doesn't exist!"

  exit 1
fi

echo "Using Theme: ${THEME}"

cp -Rf src/themes/default/static/* dist/nuxt
cp -Rf src/themes/${THEME}/static/* dist/nuxt

echo "Theme files successfully copied!"