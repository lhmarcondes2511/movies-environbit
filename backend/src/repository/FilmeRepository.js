const Filme = require("../model/Filme")


module.exports = class FilmeRepository {
  static getAllFilmes(name) {
    if(name){
      return Filme.find({ nome: {$regex: name, $options: 'i'} })
    }
    return Filme.find()
  }

  static searchFilmes() {
    return Filme.find()
  }

  static createFilme(filme) {
    return Filme.create(filme)
  }

  static getById(id) {
    return Filme.findById(id).select('nome descricao diretor pais anoLancamento img favorite')
  }

  static editFilmeSave(id, nome, descricao, diretor, pais, anoLancamento, img, favorite) {
    return Filme.findOneAndUpdate(
      { _id: id },
      { nome, descricao, diretor, pais, anoLancamento, img, favorite },
      { returnDocument: 'after'}      
    )
  }

  static deleteFilme(id) {
    return Filme.findByIdAndRemove({ _id: id })
  }
} 