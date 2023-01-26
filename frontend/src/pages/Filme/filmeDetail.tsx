import './css/detailImg.css'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { FaRegStar, FaSpinner, FaStar } from 'react-icons/fa';
import FilmeService from '../../service/filmeService';
import { Link } from 'react-router-dom';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import { storage } from '../../firebaseConfig';
import { deleteObject, ref } from 'firebase/storage';
import { toast } from 'react-toastify';

export default function FilmeDetail() {
    const navigate = useNavigate()
    const params = useParams()

    const [isLoading, setIsLoading] = useState(false);
    const [filme, setFilme] = useState<any>({})

    const [star, setStar] = useState(false)
    let status = false

    async function handleStart(id: string) {
        if (!star) {
            status = true
        } else {
            status = false
        }

        const card = await FilmeService.getById(id)

        await FilmeService.setToggleFavorite(id, card, status)

        setStar(status)
    }

    useEffect(() => {
        async function getFilmes() {
            setIsLoading(true)

            const filme = await FilmeService.getById(params.id || '')

            setFilme(filme)
            setStar(filme.favorite)
            setIsLoading(false)
        }

        getFilmes();
    }, []);

    function handleEdit(id: string) {
        navigate(`/filme/${id}`)
    }

    async function handleRemove(id: string) {
        try{
            handleCloseImg()
    
            await FilmeService.removeFilme(id)
    
            navigate('/')
            toast.success('Filme Removido com sucesso!')
        }catch(error){
            toast.error('Ocorreu um erro ao remover. Tente novamente!')
            console.log(error)
        }
    }

    function handleCloseImg() {
        const url = filme.img.split('%2F')[1].split('?alt')[0].replaceAll('%20', ' ')
        const desertRef = ref(storage, `images/${url}`);

        deleteObject(desertRef).then(() => {
            console.log('imagem deletada com sucesso!')
        }).catch((error) => {
            console.log(`Erro: ${error}`)
        });
    }

    return (
        <>
            {filme ? (
                <div className='containerDetail'>
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
                    <div className='detailImageAndInfo'>
                        <div className='detailImage'>
                            <img src={filme.img} />
                        </div>
                        <div className='detailInfo'>
                            <p className='titleInfo'><span>Título:</span> {filme.nome}</p>
                            <p className='paisInfo'><span>País:</span> {filme.pais}</p>
                            <p className='diretorInfo'><span>Diretor:</span> {filme.diretor}</p>
                            <p className='anoLancamentoInfo'><span>Ano:</span> {new Date(filme.anoLancamento).getFullYear()}</p>
                        </div>
                    </div>

                    <div className='detailDescription'>
                        <div className='iconsDetail'>
                            <div className='iconActions'>
                                <button className='editDetail' onClick={() => handleEdit(filme._id)}>
                                    <FaPencilAlt />
                                </button>
                                <button className='removeDetail' onClick={() => handleRemove(filme._id)}>
                                    <FaTrashAlt />
                                </button>
                            </div>
                            <div className='IconStar'>
                                {star ? (
                                    <FaStar
                                        style={{
                                            padding: '0.3em',
                                            fontSize: '18pt',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            color: '#FF0000',
                                        }}
                                        onClick={() => handleStart(filme._id)}
                                    />
                                ) : (
                                    <FaRegStar
                                        style={{
                                            padding: '0.3em',
                                            fontSize: '18pt',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            color: '#FF0000',
                                        }}
                                        onClick={() => handleStart(filme._id)}
                                    />
                                )}
                            </div>
                        </div>
                        <div className='descriptionContent'>
                            <p>
                                {filme.descricao}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='containerError'>
                    <div>Ocorreu um erro ao acessar o filme, tente novamente!</div>
                    <Link to='/'>
                        <p className='btnVoltar'>Voltar a página principal</p>
                    </Link>
                </div>
            )}
        </>
    )
}