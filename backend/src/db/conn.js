const mongoose = require('mongoose')

const connectDatabase = () => {
  const urlDB = process.env.URL_DB

  mongoose.connect(urlDB, { useNewUrlparser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Conectado ao MongoDB')
    }).catch((err) => {
      console.log(err)
    })
}

module.exports = connectDatabase