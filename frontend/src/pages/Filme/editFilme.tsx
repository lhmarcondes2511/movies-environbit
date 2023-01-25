import './css/filme.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import FilmeService from '../../service/filmeService';
import { Link } from 'react-router-dom';

export default function EditFilme() {
    const params = useParams()

    const [isLoading, setIsLoading] = useState(false);
    const [filme, setFilme] = useState<any>({})

    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [diretor, setDiretor] = useState('')
    const [pais, setPais] = useState('')
    const [anoLancamento, setAnoLancamento] = useState('')


    function handleEdit() {

    }


    useEffect(() => {
        async function getFilmes() {
            setIsLoading(true)

            const filmesList = await FilmeService.getById(params.id || '')

            setFilme(filmesList)

            setIsLoading(false)
        }

        getFilmes();
    }, []);

    return (
        <>
            {!isLoading ? (
                <div className='formEdit'>
                    <h1>Editar Filme</h1>
                    <hr style={{ display: 'flex', justifyContent: 'center', margin: '0 10em' }} />
                    {filme ? (
                        <form className='form' onSubmit={handleEdit}>
                            <div className='field'>
                                <label htmlFor="title">Título: <span>*</span></label>
                                <input
                                    type="text"
                                    name="nome"
                                    placeholder="Insira um título"
                                    value={filme.nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required={true} />
                            </div>
                            <div className='field'>
                                <label htmlFor="description">Descrição:</label>
                                <textarea
                                    name="description"
                                    placeholder="Descreva o seu filme"
                                    value={filme.descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    rows={5}
                                    required={false} />
                            </div>
                            <div className='field'>
                                <label htmlFor="diretor">Diretor: <span>*</span></label>
                                <input
                                    type="text"
                                    name="diretor"
                                    placeholder="Nome do Diretor"
                                    value={filme.diretor}
                                    onChange={(e) => setDiretor(e.target.value)}
                                    required={true} />
                            </div>
                            <div className='field'>
                                <label htmlFor="pais">País: <span>*</span></label>
                                <input
                                    type="text"
                                    name="pais"
                                    placeholder="País que foi criado"
                                    value={filme.pais}
                                    onChange={(e) => setPais(e.target.value)}
                                    required={true} />
                            </div>
                            <div className='field'>
                                <label htmlFor="anoLancamento">Ano de Lançamento: <span>*</span></label>
                                <input
                                    type="text"
                                    name="anoLancamento"
                                    placeholder="Ano de Lançamento (Ex: 1995)"
                                    value={new Date(filme.anoLancamento).getFullYear()}
                                    onChange={(e) => setAnoLancamento(e.target.value)}
                                    required={true} />
                            </div>
                            {filme.img ? (
                                <div className='fieldImage'>
                                    <label htmlFor="img">Imagem: <span>*</span></label>
                                    <div className='contentImage'>
                                        <img src={filme.img} />
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
                                        required={true} />
                                </div>
                            )

                            }
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