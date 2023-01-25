const express = require('express')
const route = express.Router()
const MyFavoritesController = require('../controllers/MyFavoritesController')


route.get('/', MyFavoritesController.getAllFavorites)


module.exports = route