import useCartContext from "../context/CartContext";
import useCartStatus from "../hooks/useCartStatus";
import useOrdersContext from "../context/OrdersContext";
import QuantitySelector from "../components/QuantitySelector";
import useFurnitureContext from "../context/FurnitureContext";
import { useProfileContext } from "../context/ProfileContext";
import { useState } from "react";
import AddressForm from "../components/AddressForm";
import { useToggle } from "../hooks/useToggle";
import { toast } from "react-toastify";

export default function Cart() {
  const { cartProducts, removeFromCart, updateCartQuantity } = useCartContext();
  const { cartQuantity, totalPrice, subTotal, totalDiscount, cartTotal } =
    useCartStatus();
  const { wishlistHandler } = useFurnitureContext();
  const { placeOrder } = useOrdersContext();
  const { user, addAddress } = useProfileContext();
  const [orderAddress, setOrderAddress] = useState();
  const deliveryCharge = subTotal >= 5000 ? 0 : 200;
  const showForm = useToggle(false);
  const [address, setAddress] = useState({
    doorNo: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  return (
    <>
      <div className="container">
        <h2 className="text-center display-2 m-3"> Cart</h2>
        {/* {orderSuccess && (
          <h4 className="text-center text-success">
            Order Successfully placed!{" "}
          </h4>
        )} */}
        {cartProducts.length > 0 ? (
          <div className="row">
            <div className="col-md-6">
              {cartProducts.map((product) => (
                <div className="card rounded-0">
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        src={product.images}
                        className="card-img-top product-image rounded-0 "
                        alt={product.name}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-text">{product.name}</h5>
                        <p className="m-0">Product Price: Rs.{product.price}</p>
                        <p>
                          Total Price: {product.price * product.cartQuantity}
                        </p>
                        Quantity:{" "}
                        <QuantitySelector
                          quantity={product.cartQuantity}
                          setQuantity={(newQuantity) =>
                            updateCartQuantity(product, newQuantity)
                          }
                          availableQuantity={product.availableQuantity}
                        />
                        <button
                          className="w-100 btn btn-outline-danger my-1 rounded-0"
                          onClick={() => {
                            removeFromCart(product);
                            toast.error("Product Removed from Cart");
                          }}
                        >
                          Remove From Cart
                        </button>
                        <button
                          className="w-100 btn viewCart-button my-1 rounded-0"
                          onClick={() => {
                            removeFromCart(product);
                            wishlistHandler(product);
                            toast.error("Product Moved to Wishlist");
                          }}
                        >
                          Move To Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h4> Price Details</h4>
                  <hr />
                  <p className="d-flex justify-content-between">
                    Subtotal ({cartQuantity}
                    {cartQuantity > 1 ? "items" : "item"})
                    <span> Rs. {subTotal}</span>
                  </p>
                  <p className="d-flex justify-content-between">
                    Total Discount <span> Rs. {totalDiscount}</span>
                  </p>
                  <p className="d-flex justify-content-between">
                    Delivery Charges <span> Rs. {deliveryCharge}</span>
                  </p>
                  {subTotal < 5000 && (
                    <p className="text-danger small">
                      * Add products worth {5000 - subTotal} or more to get free
                      delivery *
                    </p>
                  )}
                  <h3 className="fw-bold text-end">
                    Cart Total - {cartTotal(deliveryCharge)}
                  </h3>
                  <hr />
                  <p className="fw-bold fs-5">{user.name}</p>
                  <p>Address: </p>
                  {user.addresses.length > 0 ? (
                    user.addresses.map((addr) => (
                      <div className="m-2">
                        <input
                          type="radio"
                          name="address"
                          onChange={() => setOrderAddress(addr)}
                        />{" "}
                        No. {addr.doorNo}, {addr.street}, <br />
                        {addr.city}, {addr.state} - {addr.pincode}
                      </div>
                    ))
                  ) : (
                    <p className="text-danger">No address added</p>
                  )}
                  <button
                    className="btn btn-secondary w-100"
                    onClick={() => showForm.toggle()}
                  >
                    Add New Address
                  </button>
                  {showForm.value && (
                    <AddressForm
                      address={address}
                      setAddress={setAddress}
                      isEdit={false}
                      onSubmit={(e) => {
                        e.preventDefault();
                        addAddress(address);
                        setAddress({
                          doorNo: "",
                          street: "",
                          city: "",
                          state: "",
                          pincode: "",
                        });
                        showForm.toggle();
                      }}
                    />
                  )}
                  <br />
                  <button
                    className="btn order-button w-100 mt-2"
                    disabled={!orderAddress}
                    onClick={() => {
                      placeOrder({
                        items: cartProducts.map((item) => ({
                          product: item._id,
                          quantity: item.cartQuantity,
                          totalItemPrice: item.price * item.cartQuantity,
                        })),
                        totalPrice,
                        totalDiscount,
                        deliveryCharge,
                        totalAmount: cartTotal(deliveryCharge),
                        address: orderAddress,
                      });
                      toast.success("Order Successfully Placed");
                    }}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p>* Your Cart is empty *</p>
          </div>
        )}
      </div>
    </>
  );
}
