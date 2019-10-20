const execa = require('execa')
const semver = require('semver')

module.exports = async ({ name }, { nextRelease: { version }, logger }) => {
  function publish(dockerVersion) {
    logger.log(`Pushing version ${name}:${dockerVersion} to docker hub`)
    execa('docker', ['tag', `${name}:latest`, `${name}:${dockerVersion}`], { stdio: 'inherit' })
    execa('docker', ['push', `${name}:${dockerVersion}`], { stdio: 'inherit' })
  }

  // parse version to parts
  const { major, minor, patch, prerelease } = semver(version)

  const isProdRelease = prerelease.length === 0

  // first release version as it is
  publish(version)

  if (isProdRelease) {
    // on production release X:latest, X:1.1, X:1
    publish(`${major}.${minor}`)
    publish(`${major}`)
    publish('latest')
    return
  }

  const [channel] = prerelease

  // on other channels release X:channel, X:1.1.1-channel
  publish(channel)
  publish(`${major}.${minor}.${patch}-${channel}`)
}
