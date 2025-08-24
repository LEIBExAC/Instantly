import React, { useContext, useEffect, useState } from "react";
import LeftSideBar from "../../components/leftSideBar/LeftSideBar";
import ChatBox from "../../components/chatBox/ChatBox";
import RightSideBar from "../../components/rightSideBar/RightSideBar";
import { AppContext } from "../../context/AppContext";

function Chat() {
  const { chatData, userData, rightSideBarVisible } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (chatData && userData) {
      setLoading(false);
    }
  }, [chatData, userData]);

  return (
    <div className="chat min-h-dvh grid place-items-center">
      {loading ? (
        <div className="loading-screen h-screen w-screen flex items-center justify-center bg-gray-purple-shading-dark py-6 ">
          <div className="bg-[url(/background.png)] bg-center h-full w-full aspect-square bg-contain bg-no-repeat mx-14 my-12 flex items-center justify-center rounded-3xl">
            <div className="loading-container max-w-2xl rounded-2xl py-6 px-67 gap-5 bg-[#dbbeec1c] bg-opacity-80 backdrop-blur-xs">
              <h2 className="loading text-light-gray text-6xl font-roboto max-md:text-3xl">Loading...</h2>
            </div>
          </div>
        </div>
      ) : (
        <div className="chat-container bg-gray-Purple-shading-light h-full w-full flex justify-between items-center max-md:flex">
          <LeftSideBar />
          <ChatBox />
          {rightSideBarVisible && <RightSideBar />}
        </div>
      )}
    </div>
  );
}

export default Chat;
