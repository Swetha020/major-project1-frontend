import { useState, useEffect } from "react";
import useFurnitureContext from "../context/FurnitureContext";
import useCartContext from "../context/CartContext";
import ProductCount from "../components/ProductCount";
import { BsFillHeartFill } from "react-icons/bs";
import { Link, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function Products() {
  const {
    loading,
    error,
    filterProducts,
    filteredProducts,
    wishlistProducts,
    wishlistHandler,
  } = useFurnitureContext();

  const { cartProducts, addToCart } = useCartContext();
  const [price, setPrice] = useState(50000);
  const [rating, setRating] = useState(0);
  const [sortBy, setSortBy] = useState("");

  const category = useParams().category;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  const [categories, setCategories] = useState(category ? category : []);

  const availableCategories = [
    "Living-Room",
    "Bed-Room",
    "Dining",
    "Office",
    "Home-Decor",
  ];

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
          className="btn btn-secondary my-2 font-monospace d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#filterBar"
        >
          Filter
        </button>
        <div className="col-lg-3 col-12 collapse d-lg-block" id="filterBar">
          <div className="filter-section ms-lg-5 me-4">
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
                    {availableCategories.map((cate) => (
                      <div className="form-check" key={cate}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={cate}
                          checked={categories.includes(cate)}
                          onChange={() => checkboxHandler(cate)}
                        />
                        <label className="form-check-label" htmlFor={cate}>
                          {cate}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
                <hr />
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
        <div className="col-lg-9 col-12">
          <div className="px-5 bg-light ">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center py-2">
              <h6 className="text-body-secondary p-2">
                Showing All Products (
                <ProductCount productList={sortedProducts} />)
              </h6>
              <div className="d-flex align-items-center gap-2">
                <span>Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select text-center"
                  style={{width:"160px"}}
                >
                  <option value="" disabled>
                    --Select--
                  </option>
                  <option value="LowToHigh">Low To High</option>
                  <option value="HighToLow">High To Low</option>
                </select>
              </div>
            </div>

            <div className="row">
              {loading ? (
                <div className="d-flex justify-content-center align-items-center h-100  ">
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
                              toast.success("Added to Cart Successfully!");
                            } else {
                              toast.error("Maximum Available Product in Cart!");
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
