# semantic-release-docker

[![npm](https://img.shields.io/npm/v/semantic-release-docker.svg)](https://www.npmjs.com/package/felixfbecker/semantic-release-docker)
[![build](https://img.shields.io/travis/felixfbecker/semantic-release-docker.svg)](https://travis-ci.org/felixfbecker/semantic-release-docker)
[![downloads](https://img.shields.io/npm/dt/semantic-release-docker.svg)](https://www.npmjs.com/package/semantic-release-docker)
[![dependencies](https://img.shields.io/david/felixfbecker/semantic-release-docker.svg)](https://david-dm.org/felixfbecker/semantic-release-docker)
[![peerDependencies](https://david-dm.org/felixfbecker/semantic-release-docker/peer-status.svg)](https://david-dm.org/felixfbecker/semantic-release-docker?type=peer)
[![Greenkeeper](https://badges.greenkeeper.io/felixfbecker/semantic-release-docker.svg)](https://greenkeeper.io/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![license](https://img.shields.io/npm/l/semantic-release-docker.svg)](https://github.com/felixfbecker/semantic-release-docker/blob/master/LICENSE)

Set of [semantic-release](https://github.com/semantic-release/semantic-release) plugins for publishing a docker image to
[Docker Hub](https://hub.docker.com/).

```json
{
  "release": {
    "verifyConditions": "semantic-release-docker",
    "publish": {
      "path": "semantic-release-docker",
      "name": "username/imagename"
    }
  }
}
```

## Configuration

Your credentials have to be configured with the environment variables `DOCKER_USERNAME` and `DOCKER_PASSWORD`.

In addition, you need to specify the name of the image as the `name` setting.

## Plugins

### `verifyConditions`

Verify that all needed configuration is present and login to the Docker registry.

### `publish`

Tag the image specified by `name` with the new version, push it to Docker Hub and update the `latest` tag.

## Example .travis.yml

```yml
jobs:
  include:
    - stage: release
      language: node_js
      node_js: '8'
      services:
        - docker
      script:
        - docker build -t username/imagename .
        - npm run semantic-release

stages:
  - test
  - name: release
    if: branch = master AND type = push AND fork = false

branches:
  except:
    - /^v\d+\.\d+\.\d+$/
```
