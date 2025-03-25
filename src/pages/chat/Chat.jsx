import React from "react";
import LeftSideBar from "../../components/leftSideBar/LeftSideBar";
import ChatBox from "../../components/chatBox/ChatBox";
import RightSideBar from "../../components/rightSideBar/RightSideBar";

function Chat() {
  return (
    <div className="chat min-h-dvh bg-gradient-to-r from-blue-300 to-indigo-600 grid place-items-center overflow-hidden">
      <div className="chat-container bg-amber-50 w-[80dvw] h-[90dvh] flex justify-between items-center rounded-2xl">
        <LeftSideBar />
        <ChatBox />
        <RightSideBar />
      </div>
    </div>
  );
}

export default Chat;
