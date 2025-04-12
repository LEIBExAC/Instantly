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
    <div className="login h-screen flex items-center justify-center bg-gray-purple-shading-dark py-6">
      <div className="bg-[url(/background.png)] bg-center h-full w-full aspect-square bg-contain bg-no-repeat mx-14 my-12 flex items-center justify-center rounded-3xl">
        <div className="signup-container max-w-2xl flex flex-col items-center justify-center rounded-2xl py-6 px-7 gap-5 bg-[#dbbeec1c] bg-opacity-80 backdrop-blur-xs">
          <h2 className="text-3xl px-2 text-white font-medium">INSTANTLY</h2>

          <div className="signup-form">
            <h3 className="text-white ml-1.5 mb-4 text-lg">Sign Up</h3>
            <form className="flex flex-col gap-5  " onSubmit={onSubmitHandler}>
              {currentState === "Log In" ? (
                <></>
              ) : (
                <input
                  type="text"
                  placeholder="Username"
                  className="py-2 px-3 border bg-white border-gray-400 outline-chat-purple rounded-md placeholder:text-light-gray-text"
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
                className="py-2 px-3 border bg-white border-gray-400 outline-chat-purple rounded-md placeholder:text-light-gray-text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="py-2 px-3 border bg-white border-gray-400 outline-chat-purple rounded-md  placeholder:text-light-gray-text"
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

                <label htmlFor="privacypolicy" className="text-sm text-[#DECDCD]">
                  Agree to the terms of use &{" "}
                  <span>
                    <a href="">privacy policy.</a>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="bg-gray-purple-shading-dark text-chat-purple p-2 rounded-sm shadow-2xs cursor-pointer"
              >
                {currentState}
              </button>

              {currentState === "Sign Up" ? (
                <p className="text-[#FBECEC] text-sm">
                  Already have an account?{" "}
                  <span
                    onClick={() => setState("Log In")}
                    className="text-[#35104B] cursor-pointer"
                  >
                    Login here
                  </span>
                </p>
              ) : (
                <p className="text-[#FBECEC] text-sm">
                  New User?{" "}
                  <span
                    onClick={() => setState("Sign Up")}
                    className="text-[#35104B] cursor-pointer"
                  >
                    Register Now
                  </span>
                </p>
              )}
              {currentState === "Log In" ? (
                <p className="text-[#FBECEC] text-sm">
                  Forgot Password?{" "}
                  <span
                    onClick={() => resetPass(email)}
                    className="text-[#35104B] cursor-pointer"
                  >
                    Reset here
                  </span>
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
