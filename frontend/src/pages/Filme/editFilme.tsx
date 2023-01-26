import './css/filme.css'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import FilmeService from '../../service/filmeService';
import { storage } from '../../firebaseConfig'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { toast } from 'react-toastify';

export default function EditFilme() {
    const navigate = useNavigate()
    let [imageUpload, setImageUpload] = useState<File | null>(null)
    const params = useParams()

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingEdit, setIsLoadingEdit] = useState(false);
    const [filme, setFilme] = useState<any>({})

    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [diretor, setDiretor] = useState('')
    const [pais, setPais] = useState('')
    const [anoLancamento, setAnoLancamento] = useState('')
    const [favorite, setFavorite] = useState('')
    const [urlImg, setUrlImg] = useState('')
    const [ImgView, setImgView] = useState(true)
    const [urlImgFirebase, setUrlImgFirebase] = useState('')

    async function handleUploadImage(e: FormEvent) {
        setIsLoadingEdit(true)
        e.preventDefault();

        if (urlImg === urlImgFirebase) {
            handleEdit(urlImg)
        } else if (imageUpload !== null) {
            const imageRef = ref(storage, `images/${imageUpload.name}`)
            uploadBytes(imageRef, imageUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    handleEdit(url)
                })
            }).catch(err => {
                return console.log(`Erro: ${err}`)
            })
        } else {
            alert('Erro ao Editar')
        }
    }

    async function handleEdit(urlImage: string) {

        const formData = {
            nome: nome || '',
            descricao: descricao || '',
            diretor: diretor || '',
            pais: pais || '',
            anoLancamento: anoLancamento || '',
            img: urlImage || '',
            favorite: Boolean(favorite)
        }

        const id = filme._id;

        try {
            const createFilme = await FilmeService.edit(id, formData)
            if (createFilme) {
                setIsLoadingEdit(false)

                setNome('')
                setDescricao('')
                setDiretor('')
                setPais('')
                setAnoLancamento('')
                setImageUpload(null)

                navigate('/')
                toast.success('Filme editado com sucesso!')
            }
        } catch (error) {
            toast.error('Erro ao editar o filme. Tente novamente!')
            console.log(error)
        }

    }

    function handleCloseImg() {
        const url = urlImgFirebase.split('%2F')[1].split('?alt')[0].replaceAll('%20', ' ')
        const desertRef = ref(storage, `images/${url}`);

        deleteObject(desertRef).then(() => {
            setUrlImg('')
            setImgView(false)
        }).catch((error) => {
            toast.error('Ocorreu um erro. Tente novamente!')
            console.log(`Erro: ${error}`)
        });
    }


    useEffect(() => {
        async function getFilmes() {
            setIsLoading(true)

            const filmesList = await FilmeService.getById(params.id || '')

            setFilme(filmesList)

            setNome(filmesList.nome)
            setDescricao(filmesList.descricao)
            setDiretor(filmesList.diretor)
            setPais(filmesList.pais)
            setAnoLancamento(new Date(filmesList.anoLancamento).getFullYear().toString())
            setUrlImg(filmesList.img)
            setFavorite(filmesList.favorite)

            setUrlImgFirebase(filmesList.img)

            setIsLoading(false)
        }

        getFilmes();
    }, []);

    return (
        <>
            {!isLoading ? (
                <div className='formEdit'>
                    {isLoadingEdit && (
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
                    <h1>Editar Filme</h1>
                    <hr style={{ display: 'flex', justifyContent: 'center', margin: '0 10em' }} />
                    {filme ? (
                        <form className='form' onSubmit={handleUploadImage}>
                            <input type="hidden" name="id" value={filme._id} />
                            <div className='field'>
                                <label htmlFor="title">Título: <span>*</span></label>
                                <input
                                    type="text"
                                    name="nome"
                                    placeholder="Insira um título"
                                    onChange={(e) => setNome(e.target.value)}
                                    value={nome}
                                    required={true} />
                            </div>
                            <div className='field'>
                                <label htmlFor="description">Descrição:</label>
                                <textarea
                                    name="description"
                                    placeholder="Descreva o seu filme"
                                    onChange={(e) => setDescricao(e.target.value)}
                                    value={descricao}
                                    rows={5}
                                    required={false} />
                            </div>
                            <div className='field'>
                                <label htmlFor="diretor">Diretor: <span>*</span></label>
                                <input
                                    type="text"
                                    name="diretor"
                                    placeholder="Nome do Diretor"
                                    onChange={(e) => setDiretor(e.target.value)}
                                    value={diretor}
                                    required={true} />
                            </div>
                            <div className='field'>
                                <label htmlFor="pais">País: <span>*</span></label>
                                <input
                                    type="text"
                                    name="pais"
                                    placeholder="País que foi criado"
                                    onChange={(e) => setPais(e.target.value)}
                                    value={pais}
                                    required={true} />
                            </div>
                            <div className='field'>
                                <label htmlFor="anoLancamento">Ano de Lançamento: <span>*</span></label>
                                <input
                                    type="text"
                                    name="anoLancamento"
                                    placeholder="Ano de Lançamento (Ex: 1995)"
                                    onChange={(e) => setAnoLancamento(e.target.value)}
                                    value={anoLancamento}
                                    required={true} />
                            </div>
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
                                <button type="submit">Editar</button>
                            </div>
                        </form>
                    ) : (
                        <div className='containerError'>
                            <div>Ocorreu um erro ao acessar o filme, tente novamente!</div>
                            <Link to='/'>
                                <p className='btnVoltar'>Voltar a página principal</p>
                            </Link>
                        </div>
                    )}
                </div>
            ) : (
                <div>Erro ao editar o formulário</div>
            )}
        </>
    )
}