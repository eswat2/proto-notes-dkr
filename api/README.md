# fire-notes

a simple [**WebSockets**](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) and **REST** api notes server to support the Github Note Taker app from the egghead.io course...

```
npm install -g foreman
npm install -g nodemon

npm install
sh demon
```

### Features:

- simple notes api built on [**lowdb**](https://github.com/typicode/lowdb)
- exposed [**ws**](https://github.com/websockets/ws) api
- exposed REST api that supports CORS
- default response is JSON describing the server api

### REST

```
- GET  /keys
- GET  /notes/:username
- POST /notes
```

### Endpoints

- [localhost:8082][proto-wss] - _websocket server_
- [localhost:8182][proto-api] - _api server (REST)_

### Description

```
{
  "api": [
    {
      "url": "/keys",
      "verb": "GET",
      "what": "list of keys"
    },
    {
      "url": "/notes",
      "verb": "POST",
      "what": "creates/updates a note container"
    },
    {
      "url": "/notes/:key",
      "verb": "GET",
      "what": "fetch note container for this key"
    },
    {
      "wss": {
        "request": [
          "GET",
          "KEYS",
          "POST"
        ],
        "response": [
          "DATA",
          "ping"
        ]
      }
    }
  ]
}
```

### Reference:

- [foreman](https://www.npmjs.com/package/foreman)
- [nodemon](https://www.npmjs.com/package/nodemon)

[proto-wss]: http://localhost:8082]
[proto-api]: http://localhost:8182]
