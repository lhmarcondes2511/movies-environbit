const { default: mongoose } = require('mongoose')
const FilmeRepository = require('../repository/FilmeRepository')

module.exports = class FilmeController {
  static async getAll(req, res) {
    try {
      const { name, order } = req.query
      let filmes = ''

      if(order){
        if(order == 'anoLancamento'){
          filmes = await FilmeRepository.getAllFilmes(name).sort({ anoLancamento: 1 })
        }else if(order == 'nome'){
          filmes = await FilmeRepository.getAllFilmes(name).sort({ nome: 1 })
        }else if(order == 'pais'){
          filmes = await FilmeRepository.getAllFilmes(name).sort({ pais: 1 })
        }else {
          filmes = await FilmeRepository.getAllFilmes(name).sort({ _id: 1 })
        }  
      }else {
        filmes = await FilmeRepository.getAllFilmes(name).sort({ _id: 1 })
      }
      

      return res.status(200).send({ data: filmes })
    } catch (error) {
      return res.status(400).send({ message: 'Erro ao listar os filmes' })
    }
  }

  static async create(req, res) {
    try {
      const {
        nome,
        descricao,
        diretor,
        pais,
        anoLancamento,
        img,
        favorite,
        myfavorites
      } = req.body

      if (!nome ||
        !diretor ||
        !pais ||
        !anoLancamento ||
        !img) {
        return res.status(400).send({ message: 'Campos obrigatórios não preenchiudos' })
      }

      const form = {
        nome: nome,
        descricao: descricao,
        diretor: diretor,
        pais: pais,
        anoLancamento: anoLancamento,
        img: img,
        favorite: false
      }

      if(myfavorites){
        form.favorite = true
      }      

      const createFilme = await FilmeRepository.createFilme(form)

      return res.status(201).send({
        message: 'Filme criado com sucesso!',
        data: {
          Id: createFilme._id,
          nome,
          descricao,
          diretor,
          pais,
          anoLancamento,
          img,
          favorite
        }
      })
    } catch (error) {
      return res.status(400).send({ message: `Erro ao criar o Filme: ${error}` })
    }
  }

  static async getById(req, res) {
    try {
      const id = req.params.id

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'ID Inválido' })
      }

      if (id === '') {
        return res.status(400).send({ message: 'Campos obrigatórios não preenchiudos' })
      }

      const filme = await FilmeRepository.getById(id)

      return res.status(200).send({ data: filme })
    } catch (error) {
      return res.status(400).send({ message: 'Erro ao buscar o filme escolhido. Tente novamente!' })
    }
  }

  static async edit(req, res) {
    try {
      const id = req.params.id

      const {
        nome,
        descricao,
        diretor,
        pais,
        anoLancamento,
        img,
        favorite
      } = req.body

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'ID Inválido' })
      }

      const filmeById = await FilmeRepository.getById(id)

      if (!filmeById) {
        return res.status(400).send({ message: 'Não existe esse filme. Tenta novamente!' })
      }

      const filmeUpdate = await FilmeRepository.editFilmeSave(
        id,
        nome,
        descricao,
        diretor,
        pais,
        anoLancamento,
        img,
        favorite
      )

      return res.status(200).send({
        message: 'Filme editado com sucesso',
        data: filmeUpdate
      })
    } catch (error) {
      return res.status(400).send({ message: 'Erro ao editar o filme escolhido. Tente novamente!' })
    }
  }

  static async remove(req, res) {
    try {
      const id = req.params.id
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'ID Inválido' })
      }
  
      if (id === '') {
        return res.status(400).send({ message: 'Campos obrigatórios não preenchiudos' })
      }
  
      await FilmeRepository.deleteFilme(id)
      
      return res.status(200).send({ message: 'Filme excluído com sucesso' })
    } catch (error) {
      return res.status(400).send({ message: 'Não existe esse filme. Tenta novamente!' })
    }
  }
}