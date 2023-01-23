import './css/styles.css'
import { Link } from 'react-router-dom'

export default function PageNotFound(){
    return(
        <div className="containerNotFuund">
            <h1>404</h1>
            <p>Pagina Não encontrada</p> 
            <span>
                <Link to='/' style={{ textDecoration: 'none', color: '#000' }}>Voltar para a página inicial</Link>
            </span>
        </div>
    )
}