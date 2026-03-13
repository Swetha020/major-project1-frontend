import { useProfileContext } from "../context/ProfileContext";
import { useToggle } from "../hooks/useToggle";
import { useState } from "react";
import useOrdersContext from "../context/OrdersContext";
import AddressForm from "../components/AddressForm";
import { toast } from "react-toastify";

export default function Profile() {
  const { user, addAddress, deleteAddress, updateAddress } =
    useProfileContext();
  const { orders } = useOrdersContext();
  const showForm = useToggle(false);
  const [address, setAddress] = useState({
    _id: null,
    doorNo: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [viewOrders, setViewOrders] = useState(false);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="card m-3">
              <div className="card-body text-center">
                <img
                  src="https://placehold.co/100"
                  className="rounded-circle mb-3"
                  alt="Profile Image"
                />

                <h5 className="card-title">{user.name}</h5>
                <p className="text-muted mb-1">{user.email}</p>
                <p className="text-muted">{user.phone}</p>
                <hr />

                <p className="mb-1">
                  <strong>Member Since:</strong> June, 2025
                </p>
                <p className="mb-1">
                  <strong>Orders:</strong> {orders.length}
                </p>
                <button
                  className="btn order-button w-100"
                  onClick={() => setViewOrders(!viewOrders)}
                >
                  {viewOrders ? "Hide" : "View"} Order History
                </button>
                {viewOrders &&
                  (orders.length == 0 ? (
                    <p>No Orders found</p>
                  ) : (
                    orders.map((order) => (
                      <div className="card border-4 m-4 p-2">
                        <div className="m-2">
                          <p className="text-start small">
                            <strong>Order ID # </strong>: {order._id}{" "}
                          </p>
                          <div className="d-flex flex-column flex-md-row justify-content-between text-start">
                            <div className="d-flex gap-2">
                              <p className="m-0 fw-bold">Order Address: </p>
                              <p>
                                {order.address.doorNo}, {order.address.street},{" "}
                                {order.address.city}, {order.address.state} -{" "}
                                {order.address.pincode}
                              </p>
                            </div>
                            <div className="d-flex gap-2">
                              <p className="m-0 fw-bold">Placed on: </p>
                              <p>
                                {`${new Date(order.createdAt).toLocaleDateString()} at ${new Date(order.createdAt).toLocaleTimeString()}`}{" "}
                              </p>
                            </div>
                          </div>
                          <div className="table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">S.No</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">Price</th>
                                  <th scope="col">Quantity</th>
                                  <th scope="col">Total Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {order.items.map((item, itemNumber = 0) => (
                                  <tr>
                                    <th scope="row">{itemNumber + 1}</th>
                                    <td> {item.product.name}</td>
                                    <td>{item.product.price} </td>
                                    <td>{item.quantity}</td>
                                    <td>{item.totalItemPrice}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="text-start">
                            <p>Total MRP: {order.totalPrice} </p>
                            <p>Total Discount: {order.totalDiscount}</p>
                            <p>Delivery Charge: {order.deliveryCharge}</p>
                            <hr />
                            <p>Total Amount: {order.totalAmount}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ))}

                <hr />
                <p className="mb-3">
                  <strong>Address:</strong>
                </p>

                <div className="row">
                  {user.addresses.map((addr) => (
                    <div className="col-12 col-lg-6">
                      <div className="card m-3" key={addr._id}>
                        <div className="card-body">
                          <p className="m-0">
                            {" "}
                            No. {addr.doorNo}, {addr.street},{" "}
                          </p>

                          <p>
                            {" "}
                            {addr.city}, {addr.state} - {addr.pincode}
                          </p>

                          <button
                            className="btn btn-outline-danger mx-2"
                            onClick={() => {
                              deleteAddress(addr._id);
                              toast.error("Address Deleted Successfully");
                            }}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-outline-success"
                            onClick={() => {
                              setAddress({
                                _id: addr._id,
                                doorNo: addr.doorNo,
                                street: addr.street,
                                city: addr.city,
                                state: addr.state,
                                pincode: addr.pincode,
                              });
                              setIsEdit(true);

                              showForm.toggle();
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  {!isEdit && (
                    <button
                      className="btn btn-secondary w-100"
                      onClick={showForm.toggle}
                    >
                      Add new Address
                    </button>
                  )}
                </div>
                {showForm.value && (
                  <AddressForm
                    address={address}
                    setAddress={setAddress}
                    isEdit={isEdit}
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (isEdit) {
                        updateAddress(address._id, address);
                        toast.info("Address Updated Successfully");
                      } else {
                        addAddress(address);
                        toast.success("Address Added Successfully");
                      }
                      setAddress({
                        _id: null,
                        doorNo: "",
                        street: "",
                        city: "",
                        state: "",
                        pincode: "",
                      });
                      setIsEdit(false);
                      showForm.toggle();
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
