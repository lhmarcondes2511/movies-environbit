import api from "./api"

class FilmeService {
  static async getAll(){
    const result = await api.get(`/filmes`)
    return result.data.data
  }
  
  static async SearchAndOrder(name: string, order: string){
    const result = await api.get(`/filmes/?name=${name}&order=${order}`)
    return result.data.data
  }
}

export default FilmeService