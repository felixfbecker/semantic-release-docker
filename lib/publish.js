const execa = require('execa')
const semver = require('semver')

module.exports = async (pluginConfig, { nextRelease: { version }, logger }) => {
  const publish = tag => {
    logger.log(`Pushing version ${pluginConfig.name}:${tag} to docker hub`)
    if (tag !== 'latest') {
      execa('docker', ['tag', `${pluginConfig.name}:latest`, `${pluginConfig.name}:${tag}`], { stdio: 'inherit' })
    }
    execa('docker', ['push', `${pluginConfig.name}:${tag}`], { stdio: 'inherit' })
  }

  const v = semver.parse(version)

  let tags = ['<full>', 'latest']
  if (v.prerelease.length === 0) {
    tags = pluginConfig.prodReleaseTags || tags
  } else {
    tags = pluginConfig.preReleaseTags || tags
    tags = tags.map(tag => tag.replace(/<channel>/, [v.prerelease]))
  }

  tags
    .map(tag => tag.replace(/<major>/, v.major))
    .map(tag => tag.replace(/<minor>/, v.minor))
    .map(tag => tag.replace(/<patch>/, v.patch))
    .map(tag => tag.replace(/<full>/, version))
    .forEach(publish)
}
