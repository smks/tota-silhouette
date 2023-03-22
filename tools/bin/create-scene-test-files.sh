#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color
FILES="${PWD}/src/*.tscn"
TSCN_TEST_FILE="${PWD}/tools/templates/TestScenePlaceholder.gd"
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

  testFile="${file//.tscn/.test.gd}"

  id=${file#*"src/"}
  id=${id%".tscn"}
  echo $id

  if [[ ! -f "$testFile" ]]
  then
    sed "s/_ID/${id}/" $TSCN_TEST_FILE > "${PWD}/src/${id}.test.gd"
    echo "Added test file $testFile"
  else
    echo "Already have ${testFile}"
  fi
done