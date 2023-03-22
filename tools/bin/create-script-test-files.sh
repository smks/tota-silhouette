#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color
FILES="${PWD}/src/*.gd"
TEST_FILE="${PWD}/tools/templates/TestScriptPlaceholder.gd"
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

  testFile="${file//.gd/.test.gd}"

  id=${file#*"src/"}
  id=${id%".gd"}
  echo $id

  if [[ ! -f "$testFile" ]]
  then
    sed "s/_ID/${id}/" $TEST_FILE > "${PWD}/src/${id}.test.gd"
    echo "${NC}Added test file $testFile"
  else
    echo "${GREEN}Already have ${testFile}"
  fi
done