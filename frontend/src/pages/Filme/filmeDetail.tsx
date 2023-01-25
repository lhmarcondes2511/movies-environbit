import './css/detailImg.css'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import FilmeService from '../../service/filmeService';
import { Link } from 'react-router-dom';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'

export default function FilmeDetail() {
    const navigate = useNavigate()
    const params = useParams()

    const [isLoading, setIsLoading] = useState(false);
    const [filme, setFilme] = useState<any>({})

    useEffect(() => {
        async function getFilmes() {
            setIsLoading(true)

            const filmesList = await FilmeService.getById(params.id || '')

            setFilme(filmesList)

            setIsLoading(false)
        }

        getFilmes();
    }, []);

    function handleEdit(id: string){
        navigate(`/filme/${id}`)
    }

    function handleRemove(){
        
    }

    return (
        <>
            {filme ? (
                <div className='containerDetail'>
                    {/* Foto */}
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

                    {/* Conteudo */}
                    <div className='detailDescription'>
                        {/* Ação [Add aos Favoritos, Editar e Remover] */}
                        <div className='iconsDetail'>
                            <div className='iconActions'>
                                <button className='editDetail' onClick={() => handleEdit(filme._id)}>
                                    <FaPencilAlt />
                                </button>
                                <button className='removeDetail' onClick={handleRemove}>
                                    <FaTrashAlt />
                                </button>
                            </div>
                            <div className='IconStar'>

                            </div>
                        </div>
                        {/* Titulo, Descrição, país, diretor */}
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