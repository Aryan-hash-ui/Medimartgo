import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

 const NAVBAR_HEIGHT = 85; // Adjust based on your real navbar height

const baseStyle = {
  width: expanded ? "220px" : "70px",
  height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
  // height: "100vh",
  background: "#0d6efd",
  position: "fixed",
  top: `${NAVBAR_HEIGHT}px`,
  left: 0,
  overflowY: "auto",
  paddingTop: "15px",
  transition: "0.3s",
  zIndex: 1000,
};


  const mobileToggleBtn = {
    position: "fixed",
    top: "10px",
    left: "10px",
    zIndex: 2000,
    background: "#0d6efd",
    color: "#fff",
    border: "none",
  };

  return (
    <>
      {/* Mobile Toggle (only small screens) */}
      <button
        className="btn d-md-none"
        style={mobileToggleBtn}
        onClick={() => setExpanded(!expanded)}
      >
        <i className="fa fa-bars"></i>
      </button>

      <div
        style={baseStyle}
        className="d-none d-md-block"
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >

        <ul className="list-unstyled px-2">

          <li className="py-3">
            <Link className="text-white d-flex align-items-center gap-3 text-decoration-none" to="/admin">
              <i className="fa fa-home fs-4"></i>
              {expanded && <span>Home</span>}
            </Link>
          </li>

          <li className="py-3">
            <Link className="text-white d-flex align-items-center gap-3 text-decoration-none" to="/admin/user">
              <i className="fa fa-user fs-4"></i>
              {expanded && <span>Users</span>}
            </Link>
          </li>

          <li className="py-3">
            <Link className="text-white d-flex align-items-center gap-3 text-decoration-none" to="/admin/maincategory">
              <i className="fa fa-list fs-4"></i>
              {expanded && <span>Main Category</span>}
            </Link>
          </li>

          <li className="py-3">
            <Link className="text-white d-flex align-items-center gap-3 text-decoration-none" to="/admin/subcategory">
              <i className="fa fa-list fs-4"></i>
              {expanded && <span>Sub Category</span>}
            </Link>
          </li>

          <li className="py-3">
            <Link className="text-white d-flex align-items-center gap-3 text-decoration-none" to="/admin/brand">
              <i className="fa fa-tags fs-4"></i>
              {expanded && <span>Brand</span>}
            </Link>
          </li>

          <li className="py-3">
            <Link className="text-white d-flex align-items-center gap-3 text-decoration-none" to="/admin/product">
              <i className="fa fa-box fs-4"></i>
              {expanded && <span>Products</span>}
            </Link>
          </li>
           <li className="py-3">
            <Link className="text-white d-flex align-items-center gap-3 text-decoration-none" to="/admin/contactus">
              <i className="fa fa-box fs-4"></i>
              {expanded && <span>Contact Us</span>}
            </Link>
          </li>
          <li className="py-3">
            <Link className="text-white d-flex align-items-center gap-3 text-decoration-none" to="/admin/testimonial">
              <i className="fa fa-box fs-4"></i>
              {expanded && <span>Testimonial</span>}
            </Link>
          </li>
           <li className="py-3">
            <Link className="text-white d-flex align-items-center gap-3 text-decoration-none" to="/admin/checkout">
              <i className="fa fa-box fs-4"></i>
              {expanded && <span> All Orders</span>}
            </Link>
          </li>

        </ul>
      </div>
    </>
  );
}
