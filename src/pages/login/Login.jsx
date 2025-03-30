import React, { useState } from "react";
import Assests from "../../assets/assets";
import { signup, login, resetPass } from "../../config/firebase";

function Login() {
  const [currentState, setState] = useState("Sign Up");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (currentState === "Sign Up") {
      signup(userName, email, password);
    } else {
      login(email, password);
    }
  };

  return (
    <div className="login bg-[url(/background.png)] h-screen flex items-center justify-evenly max-md:flex max-md:flex-col max-md:justify-center max-md:gap-7">
      <img src={Assests.logo_big} alt="Instantly Logo" className="max-h-56" />

      <div className="bg-white flex flex-col rounded-xl py-6 px-7 gap-5">
        <h2 className="text-2xl px-2">{currentState}</h2>

        <form className="flex flex-col gap-5  " onSubmit={onSubmitHandler}>
          {currentState === "Log In" ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder="Username"
              className="py-2 px-3 border border-gray-400 outline-blue-500 rounded-md "
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              required
            />
          )}

          <input
            type="email"
            name="email"
            id=""
            placeholder="Email"
            className="py-2 px-3 border border-gray-400 outline-blue-500 rounded-md "
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="py-2 px-3 border border-gray-400 outline-blue-500 rounded-md "
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <div className="flex gap-2 align-center">
            <input
              type="checkbox"
              name="privacypolicy"
              id="privacypolicy"
              required
            />

            <label htmlFor="privacypolicy" className="text-sm text-gray-500">
              Agree to the terms of use &{" "}
              <span>
                <a href="">privacy policy.</a>
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-sm shadow-2xs cursor-pointer"
          >
            {currentState}
          </button>

          {currentState === "Sign Up" ? (
            <p className="text-gray-700 text-sm">
              Already have an account?{" "}
              <span
                onClick={() => setState("Log In")}
                className="text-blue-700 cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-gray-700 text-sm">
              New User?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-blue-700 cursor-pointer"
              >
                Register Now
              </span>
            </p>
          )}
          {currentState === "Log In" ? (
            <p className="text-gray-700 text-sm">
              Forgot Password?{" "}
              <span
                onClick={() => resetPass(email)}
                className="text-blue-700 cursor-pointer"
              >
                Reset here
              </span>
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default Login;
