import './css/filme.css'
import { useParams } from 'react-router';
import EditFilme from './editFilme';
import CreateFilme from './createFilme';

export default function Filme(){
    const { id } = useParams()

    if(id !== undefined){
        return (<EditFilme />)
    }else {
        return (<CreateFilme />)
    }
}