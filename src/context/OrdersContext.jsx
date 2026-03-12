import { createContext, useContext, useEffect, useState } from "react";
import useCartContext from "./CartContext";
import useFetch from "../hooks/useFetch";

const OrdersContext = createContext();

const useOrdersContext = () => useContext(OrdersContext);
export default useOrdersContext;

export function OrdersProvider({ children }) {
  const {data: placedOrders = [], loading, error} = useFetch("https://major-project1-backend-eight.vercel.app/orders");
  useEffect(() => setOrders(placedOrders), [placedOrders]);
  const [orders, setOrders] = useState(placedOrders);

  const { clearCart } = useCartContext();

  const placeOrder = async (order) => {
    const newOrder = await fetch("https://major-project1-backend-eight.vercel.app/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    const data = await newOrder.json();
    //console.log(data)
    const placedOrder = data.order;
    setOrders((prev) => [...prev, placedOrder]);
    clearCart();
   
  };

  return (
    <OrdersContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}
