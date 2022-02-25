import React, { useEffect, useState } from 'react';
import styles from './Card.module.scss'
console.log(styles)

const Card = ({onFavorite, imageUrl, title, price, onPlus}) => {

  const [isAdded, setIsAdded] = useState(false);

  const onClickPlus = () => {
    onPlus(title, imageUrl, price)
    setIsAdded(!isAdded)
  }

  useEffect(() => {
    
  }, [isAdded]);

  
    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onFavorite}>
              <img
                width={32}
                height={32}
                src="/img/heart-unliked.svg"
                alt="Unliked"
              />
            </div>
            <img width={133} height={112} src={imageUrl} alt="Sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена: </span>
                <b>{price} руб.</b>
              </div>
              
                <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "img/btn-checked.svg" : "img/btn-plus.svg"} alt="plus" />
              
            </div>
          </div>
    );
}

export default Card;
