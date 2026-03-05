export default function QuantitySelector({
  quantity,
  setQuantity,
  availableQuantity,
}) {
  const increase = () => {
    if (quantity < availableQuantity) {
      const newQty = quantity + 1;
      setQuantity(newQty);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
    }
  };

  return (
    <div className="d-flex align-items-center gap-3">
      <button
        className="btn btn-outline-secondary"
        onClick={decrease}
        disabled={quantity === 1 || availableQuantity === 0}
      >
        −
      </button>

      <span className="fs-5 fw-semibold">{quantity}</span>

      <button
        className="btn btn-outline-secondary"
        onClick={increase}
        disabled={quantity === availableQuantity || availableQuantity === 0}
      >
        +
      </button>
    </div>
  );
}
