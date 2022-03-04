import axios from "axios";
import React, {  useState } from "react";
import { useCart } from "../../hooks/useCart";
import styles from './Drawer.module.scss'
import Info from "../Card/Info";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
 
const Drawer = ({ onClose, onRemove, items = [], opened }) => {
  const {cartItems, setCartItems, totalPrice} = useCart()
  const [isOredrComplete, setIsOrederComplite] = useState(false);
  const [OredrId, setOrederId] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOreder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://6218b2941a1ba20cbaa883a4.mockapi.io/orders",
        { items: cartItems }
      );
      
      setOrederId(data.id);
      setIsOrederComplite(true);
      setCartItems([]);

     for(let i=0; i < cartItems.length; i++) {
       const item = cartItems[i]
       cartItems.forEach((item) => {
         axios.delete("https://6218b2941a1ba20cbaa883a4.mockapi.io/cart/" + item.id);
         delay(1000)
      })
     }
    } catch (error) {
      alert("Ошибка при создании заказа!");
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between">
          Корзина{" "}
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            width={32}
            height={32}
            src="/img/btn-remove.svg"
            alt="Close"
          />
        </h2>
        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%: </span>
                  <div></div>
                  <b>{totalPrice / 100 * 5} руб. </b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOreder}
                className="greenButton"
              >
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOredrComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOredrComplete
                ? `Ваш заказ #${OredrId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={
              isOredrComplete
                ? "/img/compleate-order.jpg"
                : "/img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
