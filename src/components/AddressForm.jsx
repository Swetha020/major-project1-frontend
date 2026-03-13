export default function AddressForm({ address, setAddress, isEdit, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="mt-3">
      <div class="mb-3 row">
        <label className=" col-lg-2 col-form-label text-start">Door No:</label>
        <div className="col-lg-10">
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
        </div>
      </div>
      <div class="mb-3 row">
        <label className=" col-lg-2 col-form-label text-start">Street:</label>
        <div className="col-lg-10">
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
        </div>
      </div>
      <div class="mb-3 row">
        <label className=" col-lg-2 col-form-label text-start">City:</label>
        <div className="col-lg-10">
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
        </div>
      </div>
      <div class="mb-3 row">
        <label className=" col-lg-2 col-form-label text-start">State:</label>
        <div className="col-lg-10">
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
        </div>
      </div>
      <div class="mb-3 row">
        <label className=" col-lg-2 col-form-label text-start">Pincode:</label>
        <div className="col-lg-10">
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
        </div>
      </div>
      <button type="submit" className="btn btn-success w-100">
        {isEdit ? "Update Address" : "Save Address"}
      </button>
    </form>
  );
}
