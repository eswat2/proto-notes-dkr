# proto-notes-dkr

_This project is setup to be run with **Docker**..._

- [localhost:3000][xoc-app] - _the Vue app_
- [localhost:8082][xoc-wss] - _websocket server_
- [localhost:8182][xoc-api] - _api server (REST)_

## docker

To run this multi-part app:

1. `docker-compose build`
2. `docker-compose up`

```
➜  proto-notes-dkr git:(main) ✗ docker-compose up
[+] Running 3/2
 ⠿ Network proto-notes-dkr_backbone  Created                               0.0s
 ⠿ Container proto-notes-dkr-api-1   Created                               0.0s
 ⠿ Container proto-notes-dkr-app-1   Created                               0.0s
Attaching to proto-notes-dkr-api-1, proto-notes-dkr-app-1
proto-notes-dkr-api-1  | yarn run v1.22.19
proto-notes-dkr-api-1  | $ yarn; node app.mjs
proto-notes-dkr-api-1  | [1/4] Resolving packages...
proto-notes-dkr-app-1  | yarn run v1.22.19
proto-notes-dkr-app-1  | $ yarn; vite build; vite preview --host 0.0.0.0
proto-notes-dkr-api-1  | success Already up-to-date.
proto-notes-dkr-api-1  | -- Notes Server listening on port 8182
proto-notes-dkr-api-1  | -- Websocket Server created on port 8082
proto-notes-dkr-api-1  | -- http://localhost:8182
proto-notes-dkr-app-1  | [1/4] Resolving packages...
proto-notes-dkr-app-1  | [2/4] Fetching packages...
proto-notes-dkr-app-1  | [3/4] Linking dependencies...
proto-notes-dkr-app-1  | [4/4] Building fresh packages...
proto-notes-dkr-app-1  | vite v3.1.3 building for production...
proto-notes-dkr-app-1  | transforming...
proto-notes-dkr-app-1  | ✓ 101 modules transformed.
proto-notes-dkr-app-1  | rendering chunks...
proto-notes-dkr-app-1  | dist/assets/favicon.db74ab0b.ico   4.19 KiB
proto-notes-dkr-app-1  | dist/index.html                    1.37 KiB
proto-notes-dkr-app-1  | dist/assets/index.4a29606e.css     1.24 KiB / gzip: 0.52 KiB
proto-notes-dkr-app-1  | dist/assets/index.3fed08c7.js      92.85 KiB / gzip: 35.48 KiB
proto-notes-dkr-app-1  |   ➜  Local:   http://localhost:3000/
proto-notes-dkr-app-1  |   ➜  Network: http://172.18.0.3:3000/
```

If you prefer, there are yarn commands to handle all of this:

- `yarn build` - _docker-compose build_
- `yarn start` - _docker-compose up_
- `yarn stop` - _docker-compose down_

These scripts are just a shortcuts to running `docker-compose`.

You will notice that we're not installing any npm packages locally in order to build and run this app suite.  All of that is handled by Docker...

## requirements

- [Docker Desktop for OSX][docker-osx]
- [Docker Desktop for Windows][docker-win]

## who

- Richard Hess
- [https://eswat2.github.io][eswat2-io]


[eswat2-io]: https://eswat2.github.io
[xoc-app]: http://localhost:3000
[xoc-wss]: http://localhost:8082
[xoc-api]: http://localhost:8182

[docker-osx]: https://docs.docker.com/docker-for-mac/
[docker-win]: https://docs.docker.com/docker-for-windows/