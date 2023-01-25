import api from "./api"
import { storage } from '../firebaseConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

type FormProps = {
  nome: string,
  descricao: string,
  diretor: string,
  pais: string,
  anoLancamento: string,
  img: string
}

class FilmeService {
  static async getAll() {
    const result = await api.get(`/filmes`)
    return result.data.data
  }

  static async create(form: FormProps) {
    const result = await api.post('/filmes', {
      nome: form.nome,
      descricao: form.descricao,
      diretor: form.diretor,
      pais: form.pais,
      anoLancamento: form.anoLancamento,
      img: form.img
    })
    return result.data.data
  }

  static async SearchAndOrder(name: string, order: string) {
    const result = await api.get(`/filmes/?name=${name}&order=${order}`)
    return result.data.data
  }

  static async setToggleFavorite(id: string, form: any, status: boolean) {
    const result = api.patch(`/filmes/${id}`, {
      nome: form.nome,
      diretor: form.diretor,
      pais: form.pais,
      anoLancamento: form.anoLancamento,
      img: form.img,
      favorite: status
    })
  }

  static async getById(id: string) {
    const result = await api.get(`/filmes/${id}`)
    return result.data.data
  }
}

export default FilmeService