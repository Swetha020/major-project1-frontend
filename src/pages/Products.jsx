import { useState, useEffect } from "react";
import useFurnitureContext from "../context/FurnitureContext";
import useCartContext from "../context/CartContext";
import ProductCount from "../components/ProductCount";
import { BsFillHeartFill } from "react-icons/bs";
import { Link, useParams, useLocation } from "react-router-dom";

export default function Products() {
  const {
    loading,
    error,
    filterProducts,
    filteredProducts,
    wishlistProducts,
    wishlistHandler,
  } = useFurnitureContext();
  const { cartProducts, addToCart, isAdded } = useCartContext();
  const [price, setPrice] = useState(50000);
  const [rating, setRating] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [isLimited, setIsLimited] = useState(false);

  const category = useParams().category;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  const [categories, setCategories] = useState(category ? category : []);

  useEffect(() => {
    if (!loading) {
      filterProducts(price, categories, rating);
    }
  }, [price, categories, rating, loading]);

  function checkboxHandler(selectedCategory) {
    setCategories((prevCategories) =>
      prevCategories.includes(selectedCategory)
        ? prevCategories.filter((category) => category !== selectedCategory)
        : [...prevCategories, selectedCategory],
    );
  }
  const searchedProducts = searchQuery
    ? filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : filteredProducts;

  const sortedProducts = [...searchedProducts];
  if (sortBy === "LowToHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }
  if (sortBy === "HighToLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  const isWishListedProduct = (product) => {
    return wishlistProducts.find((prod) => prod._id === product._id);
  };

  const isOutOfStock = (product) => product.availableQuantity == 0;

  const addTOCartHandler = (product) => {
    const cartProduct = cartProducts.find((prod) => prod._id === product._id);
    const remainingQuantity = cartProduct
      ? product.availableQuantity - cartProduct.cartQuantity
      : product.availableQuantity;
    return remainingQuantity;
  };

  return (
    <>
      <div className="row">
        <button
          className="btn btn-secondary m-2 font-monospace d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#filterBar"
        >
          Filter
        </button>
        <div className="col-lg-2 col-12 collapse d-lg-block" id="filterBar">
          <div className="filter-section">
            <div className="ps-5 pt-4">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="fw-bold">Filters</h3>
                <button
                  className="btn btn-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setPrice(50000);
                    setCategories([]);
                    setRating(0);
                    setSortBy("");
                  }}
                >
                  Clear
                </button>
              </div>

              <div className="p-2">
                <h4 className="fw-bold">Price</h4>
                <div className="d-flex justify-content-between text-secondary">
                  <span>1000</span>
                  <span>25000</span>
                  <span>50000</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  className="form-range"
                  value={price}
                  id="priceRange"
                  onChange={(e) => setPrice(e.target.value)}
                />
                <hr />
                {!category && (
                  <div>
                    <h4 className="fw-bold">Category</h4>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="LivingRoom"
                        checked={categories.includes("Living-Room")}
                        onChange={() => checkboxHandler("Living-Room")}
                      />
                      <label className="form-check-label" htmlFor="LivingRoom">
                        Living Room
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="BedRoom"
                        checked={categories.includes("Bed-Room")}
                        onChange={() => checkboxHandler("Bed-Room")}
                      />
                      <label className="form-check-label" htmlFor="BedRoom">
                        Bed Room
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="Office"
                        checked={categories.includes("Office")}
                        onChange={() => checkboxHandler("Office")}
                      />
                      <label className="form-check-label" htmlFor="Office">
                        Office
                      </label>
                    </div>
                    <hr />
                  </div>
                )}

                <h4 className="fw-bold">Rating</h4>
                {[4, 3, 2, 1].map((i) => (
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="rating"
                      id={`rating-${i}`}
                      checked={rating === i}
                      onChange={() => setRating(i)}
                    />
                    <label className="form-check-label" htmlFor={`rating-${i}`}>
                      {i} Stars & above
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-10 col-12">
          <div className="px-5 bg-light ">
            <div className="d-flex justify-content-between align-items-center py-2">
              <h6 className="text-body-secondary p-2">
                Showing All Products (
                <ProductCount productList={sortedProducts} />)
              </h6>
              <p className="d-flex">
                Sort By:{" "}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select text-center"
                >
                  <option value="" disabled>
                    --Select--
                  </option>
                  <option value="LowToHigh">Low To High</option>
                  <option value="HighToLow">High To Low</option>
                </select>
              </p>
            </div>
            <div className="m-2">
              {isAdded && (
                <div className="text-center">
                  <h3 className="success-message">
                    Added To Cart Successfully
                  </h3>
                  <Link to="/cart" className="btn viewCart-button">
                    View Cart
                  </Link>
                </div>
              )}
              {isLimited && (
                <div className="text-center">
                  <h3 className="fail-message">
                    Maximum Available Product In Cart
                  </h3>
                  <Link to="/cart" className="btn viewCart-button">
                    View Cart
                  </Link>
                </div>
              )}
            </div>

            <div className="row">
              {loading ? (
                <div className="d-flex justify-content-center align-items-center vh-50  ">
                  <h2>Loading our products....!</h2>
                </div>
              ) : sortedProducts.length > 0 ? (
                sortedProducts.map((product) => (
                  <div className="col-md-3" key={product._id}>
                    <div className="card m-1">
                      <div className="position-relative">
                        <div className="position-absolute end-0 p-2">
                          <button
                            className="btn btn-link"
                            onClick={() => wishlistHandler(product)}
                          >
                            <BsFillHeartFill
                              size={30}
                              color={
                                isWishListedProduct(product) ? "red" : "white"
                              }
                            />
                          </button>
                        </div>
                        <Link
                          to={`/products/${product._id}`}
                          className="text-decoration-none text-dark"
                        >
                          <img
                            src={product.images}
                            className="product-image card-img-top"
                            alt={product.name}
                          />
                          <h5 className="card-text text-center mt-3">
                            {product.name}
                          </h5>
                          <p className="text-center mb-0">
                            Price: Rs.{product.price}
                          </p>
                        </Link>
                      </div>

                      <div className="card-body">
                        <button
                          className="w-100 btn add-button"
                          onClick={() => {
                            const remainingQuantity = addTOCartHandler(product);
                            if (remainingQuantity > 0) {
                              addToCart(product);
                            } else {
                              setIsLimited(true);
                              setTimeout(() => setIsLimited(false), 3000);
                            }
                          }}
                          disabled={isOutOfStock(product)}
                        >
                          {isOutOfStock(product) ? "Sold Out" : "Add To Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="d-flex align-items-center m-5">
                  <h2 className="display-2">No Items Found</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
