/*
Blatantly copied from semantic-release/npm by Pierre Vanduynslager (https://twitter.com/@pvdlg_)
https://github.com/semantic-release/npm
*/

const path = require('path');
const {move} = require('fs-extra');
const execa = require('execa');
const updatePackageVersion = require('./update-package-version');

module.exports = async ({name, buildCmd, pkgRoot}, version, logger) => {
  const basePath = pkgRoot || '.';
  await updatePackageVersion(version, basePath, logger);

  logger.log(`Building ${name} Docker image using command: ${buildCmd}`)

  execa(`${buildCmd}`, { stdio: 'inherit' })
};