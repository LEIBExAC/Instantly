import React from "react";
import Assests from "../../assets/assets";

function Login() {
  return (
    <div className="login bg-[url(/background.png)] h-screen flex items-center">
      <div>
        <img src={Assests.logo} alt="" />
      </div>
    </div>
  );
}

export default Login;
