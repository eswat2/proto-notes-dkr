import { Low, JSONFile } from "lowdb"

let db = undefined

const connectDB = async () => {
  const adapter = new JSONFile("db.json")
  db = new Low(adapter)
  await db.read()

  // console.log("-- data", db.data)
}

const resetDB = async (callback) => {
  const note = { id: "eswat2", values: ["awesome"] }
  db.data = { notes: [note] }
  await db.write()

  // console.log("-- data", db.data)
  callback(null, note)
}

const getKeys = (callback) => {
  const { notes } = db.data
  const keys = notes
    .map((item) => {
      return item.id
    })
    .sort()
  callback(null, keys)
}

const getNote = (user, callback) => {
  const { notes } = db.data
  const key = user.toLowerCase()

  const note = notes.find((n) => n.id === key)

  callback(null, note)
}

const validNote = (note, key) => {
  return (
    note &&
    note.hasOwnProperty("id") &&
    note.id === key &&
    note.hasOwnProperty("values") &&
    note.values.length > 0
  )
}

const postNote = (user, value, callback) => {
  const { notes } = db.data
  let note = null
  const key = user.toLowerCase()

  getNote(key, async (err, object) => {
    if (!err) {
      if (validNote(object, key)) {
        note = object
        const list = note.values

        note.values = [...list, value]
      } else {
        note = { id: key, values: [value] }
        notes.push(note)
      }
      await db.write()

      // console.log("-- post", db.data)
      callback(null, note)
    } else {
      callback("failed")
    }
  })
}
//
// NOTE:  the callback needs to be in this form - function(error, data)
//
//
const api = {
  connect: connectDB,
  reset: resetDB,
  keys: getKeys,
  get: getNote,
  post: postNote,
}

export { api }
export default api
