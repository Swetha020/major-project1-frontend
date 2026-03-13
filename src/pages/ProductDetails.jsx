import { useParams } from "react-router-dom";
import useFurnitureContext from "../context/FurnitureContext";
import { BsFillStarFill, BsFillHeartFill } from "react-icons/bs";
import { getDiscountedPrice } from "../utils/discount";
import QuantitySelector from "../components/QuantitySelector";
import useCartContext from "../context/CartContext";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProductDetail() {
  const productId = useParams();
  const { products, wishlistProducts, wishlistHandler } = useFurnitureContext();

  const productData = products.find(
    (product) => product._id == productId.productId,
  );

  const { cartProducts, addToCart } = useCartContext();

  const { finalPrice } = getDiscountedPrice(productData);

  const isWishListedProduct = (product) => {
    return wishlistProducts.find((prod) => prod._id === product._id);
  };

  const cartProduct = cartProducts.find((prod) => prod._id === productData._id);
  const remainingQuantity = cartProduct
    ? productData.availableQuantity - cartProduct.cartQuantity
    : productData.availableQuantity;
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="m-2">
      <div className="container pb-3">
        <div className="row">
          <div className="col-md-3">
            <div className="position-relative">
              <div className="position-absolute end-0 p-2">
                <button
                  className="btn btn-link"
                  onClick={() => wishlistHandler(productData)}
                >
                  {" "}
                  <BsFillHeartFill
                    size={30}
                    color={isWishListedProduct(productData) ? "red" : "white"}
                  />
                </button>
              </div>
              <img
                src={productData.images}
                alt={productData.name}
                className="img-fluid w-100"
              />
            </div>
            {/* <button
              className="btn btn-outline-secondary w-100 my-2"
              disabled={productData.availableQuantity === 0}
            >
              Buy now
            </button> */}
            <button
              className="btn addProduct-button w-100"
              onClick={() => {
                if (remainingQuantity > 0) {
                  addToCart(productData, quantity);
                  toast.success(
                    `${quantity} ${quantity === 1 ? productData.name : productData.name + "s"} added to cart!`,
                  );
                  setQuantity(1);
                } else {
                  toast.error("Maximum products added to cart");
                }
              }}
              disabled={remainingQuantity === 0}
            >
              Add to cart
            </button>
            {/* {isAdded && (
              <p className="text-success">
                {quantity}{" "}
                {quantity == 1 ? productData.name : productData.name + "s"}{" "}
                added to cart Successfully
              </p>
            )} */}
          </div>
          <div className="col-md-9">
            <h1 className="display-5 mb-2">{productData.name}</h1>
            <hr />
            <small className="d-flex align-items-center gap-2">
              {productData.rating}
              <BsFillStarFill color="#FFD700" />
            </small>
            <div className="py-3">
              <div>
                <h2 className="m-0">
                  ₹{finalPrice}
                  <span className="text-secondary text-decoration-line-through px-2 fs-5">
                    ₹{productData.price}
                  </span>
                </h2>
                <h5 className="text-secondary pt-1">
                  {productData.discountPercent}% Off
                </h5>
              </div>
              <div>
                <strong className="text-bold">Quantity:</strong>
                <QuantitySelector
                  quantity={quantity}
                  setQuantity={setQuantity}
                  availableQuantity={remainingQuantity}
                />{" "}
                {cartProduct && remainingQuantity === 0 && (
                  <p className="text-danger">Maximum Available products added to cart</p>
                )}
                {!cartProduct && productData.availableQuantity === 0 && (
                  <p className="text-danger">Product sold out</p>
                )}
                <hr />
                <strong>Description: </strong>
                <p>{productData.description}</p>
                <p>
                  Dimensions: {productData.dimensions.width} x{" "}
                  {productData.dimensions.height} x{" "}
                  {productData.dimensions.depth}
                </p>
                <p>Materials: {productData.materials.join(", ")}</p>
                <p>Colors: {productData.colors.join(", ")}</p>
                <hr />
                <p>
                  Return Policy:{" "}
                  {productData.isReturnApplicable
                    ? "Return applicable within 7 days"
                    : "No Return Available"}
                </p>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
