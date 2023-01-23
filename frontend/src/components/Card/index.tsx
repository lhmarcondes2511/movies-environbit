import '../css/card.css';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type CardModel = {
  photo: string;
  title: string;
  ano: string;
}

export default function Card(props: CardModel) {
  const [star, setStar] = useState(false)

  function handleStart() {
    setStar(!star)
  }

  return (
    <>
      <div className="card">
        <Link to="/filmeDetail">
          <div className="cardHeader">
            <img src={props.photo} alt="" />
          </div>
        </Link>
        <div className="cardBody">
          <div>
            {star && (
              <FaStar
                style={{
                  position: 'absolute',
                  padding: '0.3em',
                  fontSize: '18pt',
                  cursor: 'pointer',
                  display: 'flex',
                  color: '#000',
                }}
                onClick={handleStart}
              />
            )}

            {!star && (
              <FaRegStar
                style={{
                  position: 'absolute',
                  padding: '0.3em',
                  fontSize: '18pt',
                  cursor: 'pointer',
                  display: 'flex',
                  color: '#000',
                }}
                onClick={handleStart}
              />
            )}
          </div>
          <h3>{props.title}</h3>
          <p>{new Date(props.ano).toLocaleDateString()}</p>
        </div>
      </div>
    </>
  );
}
