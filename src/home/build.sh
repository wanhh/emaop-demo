#!/bin/bash
VERSION="1.0.0"
LINE="pc"
MOD_NAME="home"
TARNAME="$LINE-$MOD_NAME-$VERSION"
TAR="output.tar.gz"
PRODUCTDIR="../../../product/"

#删除已经存在的版本
rm -rf $TARNAME
rm -rf $PRODUCTDIR/$TARNAME

#show emao-plus version
emaop --version --no-color

#build
emaop release -cuompDd output/build/$LINE

#进入LINE目录
cd output/build/$LINE

#删除产出的test目录
rm -rf test
rm -rf plugin
rm -rf build.sh
rm -rf build.bat
rm -rf static/$MOD_NAME/deploy.sh
#进入output目录
cd ../../
cp -p -r build ../../../../
#将output目录进行打包
tar zcf $TAR ./*
mv $TAR ../
cd ..
rm -rf output

mkdir $TARNAME
mv $TAR $TARNAME
cp deploy.sh $TARNAME
mv $TARNAME $PRODUCTDIR

echo "$TAR has build end"

exit
