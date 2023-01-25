import './css/header.css'
import { Link } from "react-router-dom";

export default function Header(){
    return(
        <div className="containerHeader">
            <nav className="navbar">
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <div className='title'>
                            <p>TOP <span>FLIX</span></p>
                    </div>
                </Link>
                <ul>
                    <li className="itemNav">
                        <Link to='/' style={{ textDecoration: 'none' }}>Home</Link>
                    </li>
                    <li className="itemNav">
                        <Link to='/myfavorite' style={{ textDecoration: 'none' }}>Meus Favoritos</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}