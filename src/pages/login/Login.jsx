import React, { useState } from "react";
import Assests from "../../assets/assets";

function Login() {
  const [currentState, setState] = useState("Sign Up");

  return (
    <div className="login bg-[url(/background.png)] h-screen flex items-center">
      <div>
        <img src={Assests.logo} alt="" />
      </div>
    </div>
  );
}

export default Login;
