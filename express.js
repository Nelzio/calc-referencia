const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

const referenceGenerator = require('./src/reference')

app.use(cors())

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Gerador de referencia')
})

app.route('/ref').post(referenceGenerator.referenceGeneretor)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
