import React from "react";
import notfound from "../image/notfound.jpg";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <Link to="/" className="btn">
        Go to home page
      </Link>
      <br />
      <br />
      <img src={notfound} alt="notfound" width="100%" />
    </div>
  );
}
