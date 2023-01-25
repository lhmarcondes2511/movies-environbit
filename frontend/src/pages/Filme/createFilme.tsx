import './css/filme.css'
import { ChangeEvent, FormEvent, useState } from 'react'
import { storage } from '../../firebaseConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import FilmeService from '../../service/filmeService';
import { useNavigate } from 'react-router'

export default function CreateFilme() {
    const [imageUpload, setImageUpload] = useState<File | null>(null)
    let imageUrl = ''

    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [diretor, setDiretor] = useState('')
    const [pais, setPais] = useState('')
    const [anoLancamento, setAnoLancamento] = useState('')

    async function uploadImage(e: FormEvent) {
        e.preventDefault();
        if (imageUpload == null)
            return

        const imageRef = ref(storage, `images/${imageUpload.name}`)
        const result = uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                handleCreate(url)
            })
        }).catch(err => {
            return console.log(`Erro: ${err}`)
        })  

        console.log(result)
        console.log(imageUrl)
    }

    async function handleCreate(urlImage: string) {

        const formData = {
            nome: nome || '',
            descricao: descricao || '',
            diretor: diretor || '',
            pais: pais || '',
            anoLancamento: anoLancamento || '',
            img: urlImage || ''
        }

        try {
            const createFilme = await FilmeService.create(formData)
            if (createFilme) {
                alert('Criado')
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='formCreate'>
            <h1>Cadastrar Filme</h1>
            <hr style={{ display: 'flex', justifyContent: 'center', margin: '0 10em' }} />
            <form className='form' onSubmit={uploadImage}>
                <div className='field'>
                    <label htmlFor="title">Título: &nbsp; <span>*</span></label>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Insira um título"
                        onChange={(e) => setNome(e.target.value)}
                        required={true} />
                </div>
                <div className='field'>
                    <label htmlFor="description">Descrição:</label>
                    <textarea
                        name="description"
                        placeholder="Descreva o seu filme"
                        onChange={(e) => setDescricao(e.target.value)}
                        rows={5}
                        required={false} />
                </div>
                <div className='field'>
                    <label htmlFor="diretor">Diretor: &nbsp; <span>*</span></label>
                    <input
                        type="text"
                        name="diretor"
                        placeholder="Nome do Diretor"
                        onChange={(e) => setDiretor(e.target.value)}
                        required={true} />
                </div>
                <div className='field'>
                    <label htmlFor="pais">País: &nbsp; <span>*</span></label>
                    <input
                        type="text"
                        name="pais"
                        placeholder="País que foi criado"
                        onChange={(e) => setPais(e.target.value)}
                        required={true} />
                </div>
                <div className='field'>
                    <label htmlFor="anoLancamento">Ano de Lançamento: &nbsp; <span>*</span></label>
                    <input
                        type="text"
                        name="anoLancamento"
                        placeholder="Ano de Lançamento (Ex: 1995)"
                        onChange={(e) => setAnoLancamento(e.target.value)}
                        required={true} />
                </div>
                <div className='fieldImage'>
                    <label htmlFor="img">Imagem: <span>*</span></label>
                    <input
                        type="file"
                        name="img"
                        placeholder="Imagem do Filme"
                        accept='image/*'
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            if (!e.target.files) return
                            setImageUpload(e.target.files[0])
                        }}
                        required={true} />
                </div>
                <div className='btnSubmit'>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    )
}