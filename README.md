# semantic-release-docker

[![build](https://img.shields.io/travis/felixfbecker/semantic-release-docker.svg)](https://travis-ci.org/felixfbecker/semantic-release-docker)
[![codecov](https://img.shields.io/codecov/c/github/felixfbecker/semantic-release-docker.svg)](https://codecov.io/gh/felixfbecker/semantic-release-docker)

Set of [semantic-release](https://github.com/semantic-release/semantic-release) plugins for publishing a docker image to
docker hub.

```json
{
  "release": {
    "verifyConditions": "semantic-release-docker",
    "publish": {
      "path": "semantic-release-docker",
      "name": "your-docker-image-name"
    }
  }
}
```

## verifyConditions

Verify that all needed configuration is present and login to the Docker registry.

## getLastRelease

Determine the last release of the package on the `npm` registry.

## publish

Tag the image specified by `name` with the new version, push it to Docker hub and update the `latest` tag.

## Configuration

Your credentials have to be configured with the environment variables `DOCKER_USERNAME`, `DOCKER_EMAIL` and
`DOCKER_PASSWORD`.

In addition, you need to specify the name of the image as the `name` setting.
