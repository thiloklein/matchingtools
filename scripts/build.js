#!/usr/bin/env node
'use strict';
var Path = require('path');

require('shelljs/global');
set('-e');

mkdir('-p', 'web_deploy')

cp('-R', 'web/*', 'web_deploy/');

exec('npm run swagger');

var SWAGGER_UI_DIST = require('swagger-ui-dist').getAbsoluteFSPath();

rm('-rf', 'web_deploy/swagger-ui/');
cp('-R', SWAGGER_UI_DIST, 'web_deploy/swagger-ui/');

// In swagger-initializer.js steht standardmäßig die Petstore-URL
sed('-i',
  'https://petstore.swagger.io/v2/swagger.json',
  '../swagger.json',
  'web_deploy/swagger-ui/swagger-initializer.js'
);

