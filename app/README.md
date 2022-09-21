# git-notes

I wanted to build a **Vue** version of my [**egghead-notes**](https://github.com/eswat2/egghead-notes) app and this is the result.

### Background:

I am using a custom [**WebSockets**](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) notes server to handle reading & writing notes.  That server is now is the api folder of this repo.

### Features:

- using the latest version of **Vue3**
- converted the project to use [**Vite**](https://vitejs.dev) - _NextGen Frontend Tooling_
- refined UI elements
- mobile friendly layout
- an isolated store mutated only by actions
- a simple [**eventBus**](https://github.com/scottcorgan/tiny-emitter) which controls the flow of data thru the app
- uses [**axios**](https://github.com/mzabriskie/axios) for all api calls
- uses [**WebSockets**](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) to talk to a custom notes server
- a simple html5 pushstate mechanism
- saves last valid username to local storage
- initializes app from URL if it matches `#:username`
- otherwise it reloads last username from local storage
- a simple navigator for visited usernames

### Reference:

This app is no longer deployed but made available in a Docker container that you can run locally...
