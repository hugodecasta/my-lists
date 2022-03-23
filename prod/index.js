const express = require('express')
const app = express()

const PORT = process.env.PORT ?? 3000

const api = require('./api')
app.use(api)

const dist_dir = __dirname + '/dist'
app.get('/*', express.static(dist_dir))
app.get('/*', (req, res) => res.sendFile(dist_dir + '/index.html'))

app.listen(PORT, () => console.log('List server listening on', PORT))
