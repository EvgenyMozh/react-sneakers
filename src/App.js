import { useEffect, useState } from "react";
import axios from "axios";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, isCartOpened] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get("https://6218b2941a1ba20cbaa883a4.mockapi.io/items")
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get("https://6218b2941a1ba20cbaa883a4.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
      axios
      .get("https://6218b2941a1ba20cbaa883a4.mockapi.io/favorites")
      .then((res) => {
        setFavorites(res.data);
      });
  }, []);
  

  const onAddToCart = (obj) => {
    axios.post("https://6218b2941a1ba20cbaa883a4.mockapi.io/cart", obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://6218b2941a1ba20cbaa883a4.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  const onAddToFavorite = async (obj) => {
    try {
      if(favorites.find(favObj => favObj.id === obj.id)) {
        axios.delete(`https://6218b2941a1ba20cbaa883a4.mockapi.io/favorites/${obj.id}`)
        
      } else {
        const {data} = await axios.post("https://6218b2941a1ba20cbaa883a4.mockapi.io/favorites", obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
alert('Не удалось добавить в фавориты') 
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => isCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      <Header onClickCart={() => isCartOpened(true)} />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
        />

        <Route path="/favorites" element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>}  exact />
      </Routes>
    </div>
  );
}

export default App;
