const Filme = require("../model/Filme")


module.exports = class MyFavoritesRepository { 
  static getAllFavorites(name) {
    if(name){
      return Filme.find({ favorite: true, nome: {$regex: name, $options: 'i'} })
    }
    return Filme.find({ favorite: true })
  }
} 