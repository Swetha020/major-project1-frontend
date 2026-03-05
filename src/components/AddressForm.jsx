export default function AddressForm({ address, setAddress, isEdit, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="mt-3">
      <label className="form-label">Door No:</label>
      <input
        type="text"
        className="form-control"
        value={address.doorNo}
        onChange={(e) =>
          setAddress((prev) => ({
            ...prev,
            doorNo: e.target.value,
          }))
        }
        required
      />

      <label className="form-label">Street:</label>
      <input
        type="text"
        className="form-control"
        value={address.street}
        onChange={(e) =>
          setAddress((prev) => ({
            ...prev,
            street: e.target.value,
          }))
        }
        required
      />

      <label className="form-label">City:</label>
      <input
        type="text"
        className="form-control"
        value={address.city}
        onChange={(e) =>
          setAddress((prev) => ({
            ...prev,
            city: e.target.value,
          }))
        }
        required
      />

      <label className="form-label">State:</label>
      <input
        type="text"
        className="form-control"
        value={address.state}
        onChange={(e) =>
          setAddress((prev) => ({
            ...prev,
            state: e.target.value,
          }))
        }
        required
      />

      <label className="form-label">Pincode:</label>
      <input
        type="text"
        className="form-control"
        value={address.pincode}
        onChange={(e) =>
          setAddress((prev) => ({
            ...prev,
            pincode: e.target.value,
          }))
        }
        required
      />

      <button type="submit" className="btn btn-success w-100">
        {isEdit ? "Update Address" : "Save Address"}
      </button>
    </form>
  );
}
