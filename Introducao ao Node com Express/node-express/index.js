const express = require('express')

const userRoute = require('./routes/userRoute')

const app = express()
const port = 3000


userRoute(app)

app.get('/', (req, res) => res.send('Olá mundo pelo Express!'))

app.listen(port, () => console.log('Api rodando na porta 3000'))