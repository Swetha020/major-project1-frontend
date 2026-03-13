import { Link, useNavigate } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import { BsCart3 } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { useState } from "react";
import useCartContext from "../context/CartContext";
import useFurnitureContext from "../context/FurnitureContext";
export default function Nav() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { cartProducts } = useCartContext();
  const { wishlistProducts } = useFurnitureContext();
  const searchHandler = () => {
    navigate(`/products?search=${searchValue}`);
  };

  return (
      <nav className="navbar navbar-expand-lg ">
        <div className="container p-2">
            <Link to="/" className="nav-brand ">
              FurniCart
            </Link>          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarIcons"
            aria-controls="navbarIcons"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarIcons">
            <div className="d-flex ms-auto">
            <input
              className="form-control mx-2"
              style={{ width: "250px" }}
              type="search"
              placeholder="Search for products"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className="btn btn-light" onClick={searchHandler}>
              Search
            </button>
          </div>
            <ul className="navbar-nav ms-lg-auto d-flex flex-row mt-2">
              <li className="nav-item">
                <Link to={"/wishList"} className="nav-icon">
                  <BsFillHeartFill />
                  <span className="nav-count">({wishlistProducts.length})</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/cart"} className="nav-icon">
                  <BsCart3 />
                  <span className=" nav-count">({cartProducts.length})</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/profile"} className="nav-icon">
                  <BsFillPersonFill />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  );
}
