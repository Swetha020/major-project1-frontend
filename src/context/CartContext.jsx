import { createContext, useState, useContext } from "react";

const CartContext = createContext();
const useCartContext = () => useContext(CartContext);
export default useCartContext;

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  function addToCart(product, quantity = 1) {
    setCartProducts((previousProducts) => {
      const existingProduct = previousProducts.find(
        (prod) => prod._id === product._id,
      );
      return existingProduct
        ? previousProducts.map((prod) =>
            prod._id === product._id
              ? { ...prod, cartQuantity: prod.cartQuantity + quantity }
              : prod,
          )
        : [...previousProducts, { ...product, cartQuantity: quantity }];
    });
   }

  function updateCartQuantity(product, quantity) {
    setCartProducts((previousProducts) =>
      previousProducts.map((prod) =>
        prod._id === product._id ? { ...prod, cartQuantity: quantity } : prod,
      ),
    );
  }

  function removeFromCart(product) {
    setCartProducts((previousProducts) =>
      previousProducts.filter((prod) => prod._id != product._id),
    );
  }

  function clearCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
