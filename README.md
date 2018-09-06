CodeKraft React Library
=======================

This lib is published to [NPM](https://www.npmjs.com/package/codekraft-react-frontend).

You can use following docker-compose service configuration to build and watch
on development process:

```yaml
  react:
    image: node
    working_dir: /codekraft
    entrypoint: /codekraft/entrypoint
    volumes:
      - ./codekraft-react-frontend:/codekraft
```
