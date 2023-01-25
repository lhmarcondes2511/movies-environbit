import './css/card.css';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FilmeService from '../../service/filmeService';

type CardModel = {
  id: string;
  photo: string;
  title: string;
  ano: string;
  form: any;
}

export default function Card(props: CardModel) {
  const [star, setStar] = useState(false)
  let status = false

  async function handleStart(id: string) {
    if(!star){      
      status = true
    }else {
      status = false
    }

    const card = await FilmeService.getById(id)

    await FilmeService.setToggleFavorite(id, card, status)

    setStar(status)
  }

  useEffect(() => {

    async function getById(id: string){
      const card = await FilmeService.getById(id)

      setStar(card.favorite)
    }

    getById(props.id)
  }, [])

  return (
    <>
      <div className="card">
        <input type="hidden" name="id" value={props.id} />
        <Link to={`/filmeDetail/${props.id}`}>
          <div className="cardHeader">
            <img src={props.photo} alt="" />
          </div>
        </Link>
        <div className='cardBody'>
          <div className="cardBodyContent">
            <div className='stars'>
              {star ? (
                <FaStar
                  style={{
                    // position: 'absolute',
                    padding: '0.3em',
                    fontSize: '18pt',
                    cursor: 'pointer',
                    display: 'flex',
                    color: '#000',
                  }}
                  onClick={() => handleStart(props.id)}
                />
              ) : (
                <FaRegStar
                  style={{
                    // position: 'absolute',
                    padding: '0.3em',
                    fontSize: '18pt',
                    cursor: 'pointer',
                    display: 'flex',
                    color: '#000',
                  }}
                  onClick={() => handleStart(props.id)}
                />
              )}
            </div>
            <div className='titleAndAno'>
              <div className='cardTitle'>
                <h3>{props.title}</h3>
              </div>
              <div className='cardAno'>
                <p>{new Date(props.ano).getFullYear()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
