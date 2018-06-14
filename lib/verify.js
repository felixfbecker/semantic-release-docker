const execa = require('execa')

module.exports = async ({ buildCmd, name }, { logger }) => {
  for (const envVar of ['DOCKER_USERNAME', 'DOCKER_PASSWORD']) {
    if (!process.env[envVar]) {
      throw new Error(`Environment variable ${envVar} is not set`)
    }
  }
  if (!buildCmd) {
    throw new Error(`Docker build command (buildCmd) is not set`)
  }
  if (!name) {
    throw new Error(`Docker image name (name) is not set`)
  }
  try {
    await execa('docker', ['login', '-u=' + process.env.DOCKER_USERNAME, '-p=' + process.env.DOCKER_PASSWORD], {
      stdio: 'inherit',
    })
  } catch (err) {
    throw new Error('docker login failed')
  }
}
