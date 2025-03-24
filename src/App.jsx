import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat";
import ProfileUpdate from "./pages/profileUpdate/ProfileUpdate";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/profile" element={<ProfileUpdate />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
      </Routes>
    </>
  );
}

export default App;
