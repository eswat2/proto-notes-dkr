# fire-notes

[![Heroku](https://heroku-badge.herokuapp.com/?app=fire-notes&style=flat&svg=1)](https://fire-notes.herokuapp.com)

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

### Deployed:

the server has been deployed and is running here:  [**fire-notes**](https://fire-notes.herokuapp.com/)

```json
{
  "wut": "a simple websocket & REST api notes server",
  "why": "wanted to build something like firebase",
  "who": "Richard Hess (aka. eswat2)",
  "app": "https://egghead-notes.herokuapp.com",
  "git": "https://github.com/eswat2/fire-notes",
  "wss": "wss://fire-notes.herokuapp.com",
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
