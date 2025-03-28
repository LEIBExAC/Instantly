import React, { useContext, useEffect, useState } from "react";
import LeftSideBar from "../../components/leftSideBar/LeftSideBar";
import ChatBox from "../../components/chatBox/ChatBox";
import RightSideBar from "../../components/rightSideBar/RightSideBar";
import { AppContext } from "../../context/AppContext";

function Chat() {
  const { chatData, userData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (chatData && userData) {
      setLoading(false);
    }
  }, [chatData, userData]);
  return (
    <div className="chat min-h-dvh bg-gradient-to-r from-blue-300 to-indigo-600 grid place-items-center overflow-hidden">
      {loading ? (
        <p className="loading text-white text-5xl">Loading...</p>
      ) : (
        <div className="chat-container bg-amber-50 w-[80dvw] h-[90dvh] flex justify-between items-center rounded-2xl">
          <LeftSideBar />
          <ChatBox />
          <RightSideBar />
        </div>
      )}
    </div>
  );
}

export default Chat;
