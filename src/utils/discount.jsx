export const getDiscountedPrice = ({ price, discountPercent }) => {
  const discountAmount = (price * discountPercent) / 100;
  const finalPrice = price - discountAmount;

  return {
    discountAmount,
    finalPrice,
  };
};
