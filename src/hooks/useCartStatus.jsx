import useCartContext from "../context/CartContext";
import { getDiscountedPrice } from "../utils/discount";

const useCartStatus = () => {
  const { cartProducts } = useCartContext();
  const cartQuantity = cartProducts.reduce(
    (quantity, product) => quantity + product.cartQuantity,
    0
  );

   const totalPrice = cartProducts.reduce((total, product) => {
    return total + product.price * product.cartQuantity;
  }, 0);


  const subTotal = cartProducts.reduce((total, product) => {
    const { finalPrice } = getDiscountedPrice(product);
    return total + finalPrice * product.cartQuantity;
  }, 0);

  const totalDiscount = totalPrice - subTotal
  
  const cartTotal = (deliveryCharge) =>
    subTotal + deliveryCharge;

  return { cartQuantity, totalPrice, subTotal, totalDiscount, cartTotal };
};

export default useCartStatus;
