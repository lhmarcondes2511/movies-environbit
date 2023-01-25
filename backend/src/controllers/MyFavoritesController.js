const MyFavoritesRepository = require('../repository/MyFavoritesRepository')

module.exports = class MyFavoritesController {
  static async getAllFavorites(req, res) {
    try {
      const { name, order } = req.query
      let filmes = ''

      if(order){
        if(order == 'anoLancamento'){
          filmes = await MyFavoritesRepository.getAllFavorites(name).sort({ anoLancamento: 1 })
        }else if(order == 'nome'){
          filmes = await MyFavoritesRepository.getAllFavorites(name).sort({ nome: 1 })
        }else if(order == 'pais'){
          filmes = await MyFavoritesRepository.getAllFavorites(name).sort({ pais: 1 })
        }else {
          filmes = await MyFavoritesRepository.getAllFavorites(name).sort({ _id: 1 })
        }  
      }else {
        filmes = await MyFavoritesRepository.getAllFavorites(name).sort({ _id: 1 })
      }
      

      return res.status(200).send({ data: filmes })
    } catch (error) {
      return res.status(400).send({ message: 'Erro ao listar os filmes' })
    }
  }
}