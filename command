#!/usr/bin/env bash

set -eu

npm install >> log/development.log 2>&1
npm run watch >> log/development.log 2>&1

