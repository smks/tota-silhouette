#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color
FILES="${PWD}/src/*"
testFileCount=0
noTestFileCount=0

for file in $FILES
do

  if [[ -d $file ]]; then
    continue
  fi

  if [[ "$file" == *".test"* ]]; then
    continue
  fi

  if [[ "$file" == *".tscn"* ]]; then
    continue
  fi

  testFile="${file//.gd/.test.gd}"

  if [[ ! -f "$testFile" ]]
  then
    echo "${RED}- Missing test file $testFile"
	noTestFileCount=$(( noTestFileCount + 1))
  else
    echo "${GREEN}+ Found \"$testFile\""
	testFileCount=$(( testFileCount + 1))
  fi
done

total=$(( $testFileCount + $noTestFileCount ))

echo "${NC}=========="
echo "${GREEN} + Test file count ${testFileCount}/${total}"
echo "${RED} - NO Test file count ${noTestFileCount}/${total}"
