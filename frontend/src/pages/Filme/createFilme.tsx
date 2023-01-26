import './css/filme.css'
import { ChangeEvent, FormEvent, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { storage } from '../../firebaseConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import FilmeService from '../../service/filmeService';
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { AiOutlineCloseCircle } from 'react-icons/ai'

export default function CreateFilme() {
    const searchParams = new URLSearchParams(document.location.search)
    let favorite = searchParams.get('myfavorite')!
    console.log(favorite)
    const navigate = useNavigate()
    const [imageUpload, setImageUpload] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [diretor, setDiretor] = useState('')
    const [pais, setPais] = useState('')
    const [anoLancamento, setAnoLancamento] = useState('')

    const [urlImg, setUrlImg] = useState('')
    const [ImgView, setImgView] = useState(false)

    async function handleUploadImage(e: FormEvent) {
        setIsLoading(true)
        e.preventDefault();
        if (imageUpload == null)
            return

        const imageRef = ref(storage, `images/${imageUpload.name}`)
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                handleCreate(url)
            })
        }).catch(err => {
            return console.log(`Erro: ${err}`)
        })
    }

    async function handleCreate(urlImage: string) {

        const formData = {
            nome: nome || '',
            descricao: descricao || '',
            diretor: diretor || '',
            pais: pais || '',
            anoLancamento: anoLancamento || '',
            img: urlImage || '',
            favorite: Boolean(favorite)
        }

        try {
            const createFilme = await FilmeService.create(formData)
            if (createFilme) {
                setIsLoading(false)

                setNome('')
                setDescricao('')
                setDiretor('')
                setPais('')
                setAnoLancamento('')
                setImageUpload(null)

                navigate('/')
                toast.success('Filme criado com sucesso!')
            }
        } catch (error) {
            toast.error('Erro ao criar um filme. Tente novamente!')
        }

    }

    function handleCloseImg() {
        setUrlImg('')
        setImgView(false)
    }

    return (
        <div className='formCreate'>
            {isLoading && (
                <div className='loading'>
                    <div className='loadingIcon'>
                        <FaSpinner />
                    </div>
                    <div>
                        <p>
                            Carregando
                        </p>
                    </div>
                </div>
            )}
            <h1>Cadastrar Filme</h1>
            <hr style={{ display: 'flex', justifyContent: 'center', margin: '0 10em' }} />
            <form className='form' onSubmit={handleUploadImage}>
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
                        pattern='[0-9]{4}'
                        required={true} />
                </div>
                {/* <div className='fieldImage'>
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
                </div> */}
                {ImgView ? (
                    <div className='fieldImage'>
                        <label htmlFor="img">Imagem: <span>*</span></label>
                        <p style={{ fontSize: '10pt', display: 'flex', marginBottom: '1em' }}>OBS: Ao clicar em remover a imagem, ela será removida permanente.</p>
                        <div className='contentImage'>
                            <img src={(!urlImg && imageUpload) ? URL.createObjectURL(imageUpload) : urlImg} />
                            <div className='actionCloseImg' onClick={handleCloseImg}>
                                <AiOutlineCloseCircle />
                            </div>
                        </div>
                    </div>
                ) : (
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
                                setImgView(true)
                            }}
                            required={true} />
                    </div>
                )}
                <div className='btnSubmit'>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div >
    )
}