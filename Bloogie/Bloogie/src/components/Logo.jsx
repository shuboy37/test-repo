import React from "react";
import post from "../assets/post.jpg";

function Logo({ width = "100px" }) {
  return (
    <div className="text-center">
      {/* <img src="https://cdn-icons-png.flaticon.com/512/1809/1809216.png" width={50} height={50} alt="React Post Logo" /> */}
      <img src={post} width={50} height={50} alt="React Post Logo" />
    </div>
  );
}

export default Logo;
