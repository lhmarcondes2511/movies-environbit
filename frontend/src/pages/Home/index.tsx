import { useEffect, useState } from 'react';
import './css/home.css';
import { Link, useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Card from '../../components/Card';
import FilmeService from '../../service/filmeService';
import { ref } from 'firebase/storage';
import { storage } from '../../firebaseConfig';

export default function Home() {
  const searchParams = new URLSearchParams(document.location.search)

  const [search, setSearch] = useState('')
  const [filmes, setFilmes] = useState<any>([]);
  // const [imageList, ]
  const [isLoading, setIsLoading] = useState(false);

  const imageListref = ref(storage, 'images/')

  
  useEffect(() => {
    async function getFilmes() {
      setIsLoading(true)
      const name = searchParams.get('name') ! 
      const order = searchParams.get('order') !

      if(name || order){
        const filmesList = await FilmeService.SearchAndOrder(name, order)
        setFilmes(filmesList)
      }else{
        const filmesList = await FilmeService.getAll()
        setFilmes(filmesList)
      }

      setIsLoading(false)
    }
    getFilmes();
  }, []);

  return (
    <div className="containerBody">
      <div className="titleText">
        <h2>Veja todos os nossos filmes</h2>
        <p>
          Deixamos umas amostras de filmes que você poderia gostar. <br />
          Caso queira, pode adicionar mais filmes na lista
        </p>
      </div>
      <div className="button">
        <Link to="/filme" style={{ textDecoration: 'none' }}>
          <FaPlus style={{ marginRight: '5px' }} /> Filmes
        </Link>
      </div>
      <div className="content">
        <div className="searchAndOrdination">
          <div className="search">
            <form action="/search" method='get'>
              <input type="text" placeholder="Pesquisar um Filme" onChange={(e) => setSearch(e.target.value)} />
              <input type="submit" value="Buscar" />
            </form>
          </div>
          <div className="ordination">
            <span>Ordernar por: </span>
            <div className="btnOrdination">
              <form action="/search" method="get">
                <input type="hidden" name="name" value={search} />
                <input type="hidden" name="order" value="anoLancamento" />
                <button type='submit'>Ano de Lançamento</button>
              </form>
              <form action="/search" method="get">
                <input type="hidden" name="name" value={search} />
                <input type="hidden" name="order" value="nome" />
                <button type='submit'>Nome</button>
              </form>
              <form action="/search" method="get">
                <input type="hidden" name="name" value={search} />
                <input type="hidden" name="order" value="pais" />
                <button type='submit'>País</button>
              </form>
              <form action="/" method="get">
                <button type='submit'>Limpar</button>
              </form>
            </div>
          </div>
        </div>

        <hr style={{ margin: '2em 0em' }} />
        {isLoading ? (
          <span>Carregando</span>
        ) : (
          <div className="listFilms">
            {filmes.map((filme: any) => (
              <Card photo={filme.img} title={filme.nome} ano={filme.anoLancamento} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
