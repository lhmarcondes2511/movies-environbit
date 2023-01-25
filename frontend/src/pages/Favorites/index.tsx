import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import FilmeService from "../../service/filmeService";


export default function Favorites() {
    const searchParams = new URLSearchParams(document.location.search)
    let name = searchParams.get('name')!
    let order = searchParams.get('order')!

    const [search, setSearch] = useState<string>('')
    const [filmes, setFilmes] = useState<any>([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getFilmes() {
            setIsLoading(true)

            setSearch(name)

            if (!name && !order) {
                const filmesList = await FilmeService.getAllFavorites()
                setFilmes(filmesList)
            } else {
                const filmesList = await FilmeService.SearchAndOrderFavorites(name, order)
                setFilmes(filmesList)
            }

            setIsLoading(false)
        }
        
        getFilmes();
    }, []);

    return (
        <div className="containerBody">
            <div className="titleText">
                <h2>Filmes Favoritos</h2>
                <p>
                    Abaixo encontra-se todos os filmes que foram salvos como favoritos. <br />
                    Caso queira criar um filme direto nos favoritos, basta clicar no botão "<b>+ Filmes Favoritos</b>"
                </p>
            </div>
            <div className="button">
                <Link to="/filme?favorite=true" style={{ textDecoration: 'none' }}>
                    <FaPlus style={{ marginRight: '5px' }} /> Filmes Favoritos
                </Link>
            </div>
            <div className="content">
                <div className="searchAndOrdination">
                    <div className="search">
                        <form action="/myfavorite/search" method='get'>
                            <input type="text" name="name" placeholder="Pesquisar um Filme" onChange={(e) => setSearch(e.target.value)} />
                            <button className='btnSearch' type="submit">Buscar</button>
                        </form>
                    </div>
                    <hr style={{ margin: '1em 0em' }} />
                    {filmes.length > 0 ? (

                        <div className="ordination">
                            <span>Ordernar por: </span>
                            <div className="btnOrdination">
                                <form action="/myfavorite/search" method="get">
                                    <input type="hidden" name="name" value={search} />
                                    <input type="hidden" name="order" value="anoLancamento" />
                                    <button className={`btnOrder ${order === 'anoLancamento' ? 'active' : ""} `} type='submit'>Ano de Lançamento</button>
                                </form>
                                <form action="/myfavorite/search" method="get">
                                    <input type="hidden" name="name" value={search} />
                                    <input type="hidden" name="order" value="nome" />
                                    <button className={`btnOrder ${order === 'nome' ? 'active' : ""} `} type='submit'>Nome</button>
                                </form>
                                <form action="/myfavorite/search" method="get">
                                    <input type="hidden" name="name" value={search} />
                                    <input type="hidden" name="order" value="pais" />
                                    <button className={`btnOrder ${order === 'pais' ? 'active' : ""} `} type='submit'>País</button>
                                </form>
                                <form action="/myfavorite" method="get">
                                    <input type="hidden" name="name" value='' />
                                    <input type="hidden" name="order" value='' />
                                    <button className='btnOrder limpar' type='submit'>Limpar</button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className='searchNotFound'>
                            {!name ? (
                                <>
                                    <p>Nenhum filme como favorito. <br /> <Link to='/'>Clique aqui</Link> para ir na página principal adicionar </p>
                                </>
                            ) : (
                                <>
                                    <p>Nenhum resultado com <span>{name}</span></p>
                                    <form action="/myfavorite" method="get">
                                        <button className='btnOrder' type='submit'>Limpar Pesquisa</button>
                                    </form>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {isLoading ? (
                    <span>Carregando</span>
                ) : (
                    <div className="listFilms">
                        {filmes.map((filme: any) => (
                            <Card key={filme._id} id={filme._id} form={filme} photo={filme.img} title={filme.nome} ano={filme.anoLancamento} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}