import { Link } from "react-router-dom";
export default function Home() {
  const categories = [
    {
      name: "All Products",
      src: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
      url: "/products",
    },
    {
      name: "Living Room",
      src: "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg",
      url: "/products/categories/Living-Room",
    },
    {
      name: "Bed Room",
      src: "https://images.pexels.com/photos/6782577/pexels-photo-6782577.jpeg",
      url: "/products/categories/Bed-Room",
    },
    {
      name: "Dining",
      src: "https://images.pexels.com/photos/3139124/pexels-photo-3139124.jpeg",
      url: "/products/categories/Dining",
    },
    {
      name: "Office",
      src: "https://images.pexels.com/photos/159839/office-home-house-desk-159839.jpeg",
      url: "/products/categories/Office",
    },
    {
      name: "Home Decor",
      src: "https://images.pexels.com/photos/354939/pexels-photo-354939.jpeg",
      url: "/products/categories/Home-Decor",
    },
  ];

  return (
    <>
      <div className="container-lg">
        <div className="mt-3">
          <div className="d-flex align-items-center my-4">
            <hr className="flex-grow-1 " />
            <span className="px-3 fw-semibold">
              Shop from our exclusive luxury collections
            </span>
            <hr className="flex-grow-1 " />
          </div>
          <div className="row g-3">
            {categories.map((category) => (
              <div className="col-2">
                <div className="card category-card">
                  <img
                    className="category-images object-fit-cover rounded"
                    src={category.src}
                    alt={category.name}
                  />
                  <Link to={category.url}>
                    <div className="card-img-overlay d-flex justify-content-center align-items-center">
                      <div className="category-name">
                        <p className=" card-text fw-bold text-center opacity-100 px-3">
                          {category.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div
          id="furnitureCarousel"
          className="carousel slide mt-3 "
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://www.woodpeckerfurniture.com/cdn/shop/files/WhatsApp_Image_2025-08-14_at_1.22.55_PM_1.jpg?v=1755158685&width=1800"
                className="d-block w-100"
                alt="img1"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://www.woodpeckerfurniture.com/cdn/shop/files/WhatsApp_Image_2025-08-14_at_1.19.28_PM_1.jpg?v=1755158707&width=2000"
                className="d-block w-100"
                alt="img2"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://www.woodpeckerfurniture.com/cdn/shop/files/WhatsApp_Image_2025-08-14_at_1.14.34_PM_1.jpg?v=1755158680&width=1800"
                className="d-block w-100"
                alt="img3"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#furnitureCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#furnitureCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="my-3 my-4">
          <div className="d-flex align-items-center my-4">
            <hr className="flex-grow-1 " />
            <span className="px-3 fw-semibold">Offer Zone</span>
            <hr className="flex-grow-1 " />
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card bg-dark text-light">
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src="https://images.pexels.com/photos/5644368/pexels-photo-5644368.jpeg"
                      className="img-fluid object-fit-cover "
                      style={{ height: "180px", width: "100%" }}
                      alt="img1"
                    />
                  </div>
                  <div className="col-md-8 d-flex align-items-center">
                    <div className="card-body ">
                      <h5 className="card-title">
                        Flat <span className="fw-bold fs-3">10% off </span>
                        <br />
                        On Sofa sets and more
                        <br />
                      </h5>
                      <button className="btn btn-light">Shop Now </button>

                      <p className="card-text"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card bg-dark text-light">
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src="https://images.pexels.com/photos/12269763/pexels-photo-12269763.jpeg"
                      className="img-fluid object-fit-cover "
                      style={{ height: "180px", width: "100%" }}
                      alt="img1"
                    />
                  </div>
                  <div className="col-md-8 d-flex align-items-center">
                    <div className="card-body ">
                      <h5 className="card-title">
                        Enjoy Flat{" "}
                        <span className="fw-bold fs-3">15% off </span>
                        <br />
                        On Office Furnitures
                        <br />
                      </h5>
                      <button className="btn btn-light">Shop Now </button>

                      <p className="card-text"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex align-items-center my-4">
            <hr className="flex-grow-1 " />
            <span className="px-3 fw-semibold">Shop By Product</span>
            <hr className="flex-grow-1 " />
          </div>
          <div className="mb-3">
            <div className="row">
              <div className="col-3 ">
                <img
                  className="img-fluid rounded"
                  src="https://images.pexels.com/photos/8135263/pexels-photo-8135263.jpeg"
                  alt=""
                />
                <p className="text-center">Sofa</p>
              </div>
              <div className="col-3">
                <img
                  className="img-fluid rounded"
                  src="https://images.pexels.com/photos/17219738/pexels-photo-17219738.jpeg"
                  alt=""
                />
                <p className="text-center">Bed</p>
              </div>
              <div className="col-3">
                <img
                  className="img-fluid rounded"
                  src="https://images.pexels.com/photos/271696/pexels-photo-271696.jpeg"
                  alt=""
                />
                <p className="text-center ">Dining Table</p>
              </div>
              <div className="col-3">
                <img
                  className="img-fluid rounded"
                  src="https://images.pexels.com/photos/8111799/pexels-photo-8111799.jpeg"
                  alt=""
                />
                <p className="text-center ">Office Chair</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
