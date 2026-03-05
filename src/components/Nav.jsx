import { Link, useNavigate } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import { BsCart3 } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import useFurnitureContext from "../context/FurnitureContext";
import { useState } from "react";
export default function Nav() {
  // const { products, setFilteredProducts } = useFurnitureContext();
  const navigate = useNavigate()
  const [searchValue,setSearchValue] = useState("")

const searchHandler = () => {
  navigate(`/products?search=${searchValue}`);
};


  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <div className="container p-2">
          <Link to="/" className="nav-brand">
            FurniCart
          </Link>
         <div className="d-flex">
           <input
            className="form-control mx-2"
            style={{width:"250px"}}
            type="search"
            placeholder="Search for products"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="btn btn-light" onClick={searchHandler}>Search</button>

         </div>
          <div className="d-flex">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/wishList"} className="nav-icon">
                  {" "}
                  <BsFillHeartFill />
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/cart"} className="nav-icon">
                  <BsCart3 />
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
    </div>
  );
}
