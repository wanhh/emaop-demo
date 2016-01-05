#!/bin/sh
WKDIR=`dirname $0`
WKDIR=$(cd $WKDIR;pwd)
TAR="output.tar.gz"
cd $WKDIR
rm -rf build
tar -zxvf $TAR
cp -p -r build/* ../../build/
echo "deploy end"
exit