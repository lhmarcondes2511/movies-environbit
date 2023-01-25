const express = require('express')
const connectDatabase = require('./db/conn')
const app = express()
const filmeRoute = require('./routes/FilmeRoute')
const myfavoriteRoutes = require('./routes/MyFavorites')
const env = require('dotenv')
const cors = require('cors')

env.config()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).send({
    name: 'movies-api',
    status: 'ok'
  })
})

app.use('/filmes', filmeRoute)
app.use('/myfavorites', myfavoriteRoutes) 

connectDatabase()

const port = process.env.PORT || 3333

app.listen(port, () => {
    console.log('Servidor conectado')
})