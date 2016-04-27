cd gulp
gulp c
sleep 2
ls
gulp b
cd dist
git add .
git commit -am autoBuild
git push origin buildDev