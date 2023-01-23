const express = require('express')
const route = express.Router()
const FilmeController = require('../controllers/FilmeController')


route.get('/', FilmeController.getAll)
route.post('/', FilmeController.create)
route.get('/:id', FilmeController.getById)
route.patch('/:id', FilmeController.edit)
route.delete('/:id', FilmeController.remove)


module.exports = route