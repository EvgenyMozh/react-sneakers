import React, { useContext, useEffect, useState } from 'react';
import ContentLoader from "react-content-loader"
import AppContext from '../../context';
import styles from './Card.module.scss'


const Card = ({id, onFavorite, imageUrl, title, price, onPlus, favorited = false, loading=false}) => {

  const {isItemAdded} = useContext(AppContext)

 /*  const [isAdded, setIsAdded] = useState(added); */
  const [isFavorite, setIsFavorite] = useState(favorited)

  const onClickPlus = () => {
    onPlus({id, title, imageUrl, price})
    /* setIsAdded(!isAdded) */
  }

  /* useEffect(() => {
    
  }, [isAdded]); */

  const onClickFavorite = () => {
    onFavorite({id, title, imageUrl, price})
    setIsFavorite(!isFavorite)
  }

  
    return (
      
        <div className={styles.card}>
          {
            loading ? (<ContentLoader 
              speed={2}
              width={160}
              height={250}
              viewBox="0 0 155 245"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb">
              <rect x="0" y="0" rx="10" ry="10" width="155" height="155" /> 
              <rect x="0" y="165" rx="5" ry="5" width="155" height="15" /> 
              <rect x="0" y="185" rx="5" ry="5" width="100" height="15" /> 
              <rect x="0" y="220" rx="5" ry="5" width="80" height="25" /> 
              <rect x="123" y="215" rx="5" ry="5" width="30" height="30" />
            </ContentLoader>) : (
              <>
              <div className={styles.favorite} onClick={onClickFavorite}>
              <img
                width={32}
                height={32}
                src={isFavorite ? "/img/heart-liked.svg" : "img/heart-unliked.svg"}
                alt="Unliked"
              />
            </div>
            <img width='100%' height={135} src={imageUrl} alt="Sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена: </span>
                <b>{price} руб.</b>
              </div>
              
                <img className={styles.plus} onClick={onClickPlus} src={isItemAdded(id) ? "img/btn-checked.svg" : "img/btn-plus.svg"} alt="plus" />
              
            </div>
          
              </>
            )
          }
          </div>  
    );
}

export default Card;
