const { default: mongoose } = require('mongoose')
const mogoose = require('mongoose')

const filmeSchema = new mogoose.Schema({
    nome: {
        type: String,
        require
    },
    descricao: {
        type: String
    },
    diretor: {
        type: String,
        require
    },
    pais: {
        type: String,
        require
    },
    anoLancamento: {
        type: Date,
        require
    },
    img: {
        type: String,
        require
    },
    favorite: {
        type: Boolean
    }
})

const Filme = mongoose.model('Filme', filmeSchema)

module.exports = Filme