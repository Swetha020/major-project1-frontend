import useFurnitureContext from "../context/FurnitureContext";
import { Link } from "react-router-dom";
import { CgCloseO } from "react-icons/cg";
import useCartContext from "../context/CartContext";
import { toast } from "react-toastify";

export default function WishList() {
  const { wishlistProducts, removeFromWishlist } = useFurnitureContext();
  const { addToCart } = useCartContext();

  return (
    <>
      <div className="container">
        <h2 className="text-center display-2 m-3">Wishlist</h2>

        {/* {message && (
        <div className="text-center">
          <p className="text-danger fs-3">{message}</p>
        </div>
      )} */}

        <div className="row">
          {wishlistProducts.length > 0 ? (
            wishlistProducts.map((product) => (
              <div className="col-md-3">
                <div className="card m-2">
                  <div className="position-relative">
                    <div className="position-absolute end-0 ">
                      <button
                        className="btn btn-link mt-2"
                        onClick={() => {
                          removeFromWishlist(product._id);
                          toast.info("Product Removed From Wishlist");
                        }}
                      >
                        <CgCloseO size={30} color="Black" />
                      </button>
                    </div>
                    <Link
                      to={`/products/${product._id}`}
                      className="text-decoration-none text-dark"
                    >
                      <img
                        src={product.images}
                        className="card-img-top product-image"
                        alt={product.name}
                      />
                    </Link>
                  </div>
                  <div className="card-body">
                    <h5 className="card-text text-center">{product.name}</h5>
                    <p className="text-center">Price: Rs.{product.price}</p>
                    {product.availableQuantity > 0 ? (
                      <button
                        className="w-100 btn btn-primary"
                        onClick={() => {
                          addToCart(product);
                          removeFromWishlist(product._id);
                          toast.success("Product Moved to Cart");
                        }}
                      >
                        Move To Cart
                      </button>
                    ) : (
                      <p className="text-center text-danger fs-5 fw-bold m-0">
                        - Product out of stock -
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <p className="text-center">* Your wish list is empty *</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
