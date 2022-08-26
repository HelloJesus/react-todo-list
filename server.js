const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.statis(__dirname))
app.use(express.statis(path.resolve(__dirname, 'build')))

app.listen(PORT)