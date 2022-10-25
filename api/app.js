import { WebSocketServer } from "ws"
import express from "express"
import http from "http"
import notes from "./notes.js"

import bodyParser from "body-parser"
import cors from "cors"

const app = express()
const port = process.env.PORT || 8182
const wssp = process.env.WSSP || 8082

const mock = {
  api: [
    { url: "/keys", verb: "GET", what: "list of keys" },
    { url: "/notes", verb: "POST", what: "creates/updates a note container" },
    {
      url: "/notes/:key",
      verb: "GET",
      what: "fetch note container for this key",
    },
    {
      wss: {
        request: ["GET", "KEYS", "POST"],
        response: ["DATA", "KEYS", "ping"],
      },
    },
  ],
}

const server = http.createServer(app)
const serverOnPort = server.listen(port)

console.log("-- Notes Server listening on port", port)

notes.connect()

const wss = new WebSocketServer({ port: wssp })
console.log("-- Websocket Server created on port", wssp)
console.log("-- http://localhost:" + port)

const updateClients = (note) => {
  // NOTE:  update the websocket clients...
  wss.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        type: "DATA",
        id: note.id,
        values: note.values,
      })
    )
  })
  // NOTE:  if this is a new note, update the keys...
  if (note.values.length === 1) {
    notes.keys((err2, keys) => {
      if (!err2) {
        wss.clients.forEach((client) => {
          client.send(JSON.stringify({ type: "KEYS", keys: keys }))
        })
      }
    })
  }
}

wss.on("connection", (ws) => {
  console.log("-- wss: Client connected")

  ws.on("close", () => {
    console.log("-- wss: Client disconnected")
  })

  ws.on("message", (message) => {
    if (message === "pong") {
      console.log("-- wss: pong")
    } else {
      const obj = JSON.parse(message)
      const user = obj.id ? obj.id.toLowerCase() : null
      console.log("-- wss: " + obj.type + " " + user)
      if (obj.type === "GET") {
        notes.get(user, (err, note) => {
          if (!err) {
            if (note) {
              ws.send(
                JSON.stringify({
                  type: "DATA",
                  id: note.id,
                  values: note.values,
                })
              )
            } else {
              ws.send(JSON.stringify({ type: "DATA", id: user, values: [] }))
            }
          }
        })
      }
      if (obj.type === "KEYS") {
        notes.keys((err, keys) => {
          if (!err) {
            ws.send(JSON.stringify({ type: "KEYS", keys: keys }))
          }
        })
      }
      if (obj.type === "POST") {
        notes.post(user, obj.value, (err, note) => {
          if (!err) {
            updateClients(note)
          }
        })
      }
    }
  })
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.get("/keys", (req, res) => {
  notes.keys((err, keys) => {
    if (!err) {
      res.json(keys)
    }
  })
})

app.get("/notes/:username", (req, res) => {
  const user = req.params.username.toLowerCase()
  if (user) {
    notes.get(user, (err, note) => {
      if (!err) {
        if (note) {
          res.json(note)
        } else {
          res.json({ id: user, values: [] })
        }
      }
    })
  }
})

app.post("/notes", (req, res) => {
  const user = req.body.id.toLowerCase()
  const value = req.body.value
  notes.post(user, value, (err, note) => {
    if (!err) {
      updateClients(note)
      res.json(note)
    }
  })
})

app.post("/reset", (req, res) => {
  notes.reset((err, note) => {
    updateClients(note)
    res.json(note)
  })
})

app.use((req, res) => {
  res.send(mock)
})

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send("ping")
  })
}, 1000)
