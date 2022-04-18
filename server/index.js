const express = require("express")

const app = express()
app.use(require('cors')())
app.use(express.json())

require('./plugins/db')(app)
require('./routes')(app)

app.listen(3000, () => {
    console.log("server listening on port 3000")
})