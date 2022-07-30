npm run build

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | xargs) # trims whitespace

gh release create $PACKAGE_VERSION --notes "release $PACKAGE_VERSION" "./resume-${PACKAGE_VERSION}.pdf"
