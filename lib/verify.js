const execa = require('execa')

module.exports = async (pluginConfig, { logger }) => {
  for (const envVar of ['DOCKER_USERNAME', 'DOCKER_PASSWORD']) {
    if (!process.env[envVar]) {
      throw new Error(`Environment variable ${envVar} is not set`)
    }
  }
  try {
    await execa('docker', ['login', '-u=' + process.env.DOCKER_USERNAME, '-p=' + process.env.DOCKER_PASSWORD], {
      stdio: 'inherit',
    })
  } catch (err) {
    throw new Error('docker login failed')
  }
}
