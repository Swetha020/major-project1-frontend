import { createContext, useState, useContext } from "react";
import useFetch from "../hooks/useFetch";

const FurnitureContext = createContext();
const useFurnitureContext = () => useContext(FurnitureContext);
export default useFurnitureContext;

export function FurnitureProvider({ children }) {
  const {data:products=[], loading, error} = useFetch("https://major-project1-backend-eight.vercel.app/products")
  
  const [filteredProducts, setFilteredProducts]=useState([])

  function filterProducts(price, categories, rating) {
    const filteredProductsByPrice = products.filter(
      (product) => product.price <= price
    );
    const filteredProductsByCategories =
      categories.length > 0
        ? filteredProductsByPrice.filter((product) =>
            categories.includes(product.category)
          )
        : filteredProductsByPrice;

    const filteredProductsByRating = filteredProductsByCategories.filter(
      (product) => product.rating >= rating
    );
    setFilteredProducts(filteredProductsByRating)
  }

  const [wishlistProducts, setWishlistProducts] = useState([]);

  function wishlistHandler(product) {
    setWishlistProducts((prevProducts) =>
      prevProducts.find((p) => p._id === product._id)
        ? prevProducts.filter((p) => p._id !== product._id)
        : [...prevProducts, product]
    );
  }

  function removeFromWishlist(productId) {
    setWishlistProducts((prevProducts) =>
      prevProducts.filter((item) => item._id !== productId)
    );
  }

  return (
    <FurnitureContext.Provider
      value={{
        products,
        loading,
        error,
        filteredProducts, setFilteredProducts,
        filterProducts,
        wishlistProducts,
        wishlistHandler,
        removeFromWishlist,
      }}
    >
      {children}
    </FurnitureContext.Provider>
  );
}
