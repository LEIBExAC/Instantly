import React, { useContext, useEffect, useState } from "react";
import assets from "../../assets/assets";
import { logout } from "../../config/firebase";
import { AppContext } from "../../context/AppContext";

function RightSideBar() {
  const { chatUser, messages, rightSideBarVisible, setRightSideBarVisible } = useContext(AppContext);
  const [msgImages, setMsgImages] = useState([]);

  useEffect(() => {
    let tempVar = [];
    messages.map((msg) => {
      if (msg.image) {
        tempVar.push(msg.image);
      }
    });
    setMsgImages(tempVar);
  }, [messages]);

  return chatUser ? (
    <div className={"rs bg-mid-gray text-amber-50 h-full flex flex-col justify-center items-center px-2 py-3 min-w-xs max-w-xs gap-10 bg-[url(/background.png)] bg-top border-l rounded-l-md" + (rightSideBarVisible ? "" : " max-md:hidden")}>
      <div className="rs-top w-full">
        <img
          src={assets.arrow_icon}
          alt="back-button"
          className="hidden max-w-5 max-md:block"
          onClick={() => setRightSideBarVisible(!rightSideBarVisible)} />
      </div>

      <div className="rs-profile text-center flex flex-col items-center p-4 bg-[#62007a3b] bg-opacity-50 backdrop-blur-xs rounded-2xl">

        <img
          src={chatUser.userData.avatar}
          alt=""
          className="w-28 rounded-full aspect-square mb-2 opacity-100"
        />

        <h3 className="font-light flex items-center justify-center gap-1.5 mx-1.5">
          {Date.now() - chatUser.userData.lastSeen <= 70000 ? (
            <img src={assets.green_dot} alt="" />
          ) : null}{" "}
          {chatUser.userData.name}
        </h3>

        <p className="text-[0.75rem] opacity-80 font-light">
          {chatUser.userData.bio}
        </p>
      </div>

      <hr className="border w-full border-[#ffffff6c]" />

      <div className="rs-media text-[0.85rem] grow bg-[#3f1649a2] bg-opacity-50 backdrop-blur-xs rounded-2xl p-4 min-w-full">
        <p className="text-xl">Media</p>
        <div className="max-h-44 overflow-y-scroll grid grid-cols-[1fr_1fr_1fr] gap-2 mt-2">
          {msgImages.length !== 0 ? (msgImages.map((url, index) => (
            <img
              onClick={() => window.open(url)}
              key={index}
              src={url}
              alt=""
              className="w-20 aspect-[7/6] rounded-xl cursor-pointer "
            />
          ))) : (
            <p className="text-center text-gray-400 text-nowrap">No media found</p>
          )}
          {/* <img
            src={assets.pic1}
            alt=""
            className="w-16 rounded-xl cursor-pointer"
          />
          <img
            src={assets.pic2}
            alt=""
            className="w-16 rounded-xl cursor-pointer"
          />
          <img
            src={assets.pic3}
            alt=""
            className="w-16 rounded-xl cursor-pointer"
          />
          <img
            src={assets.pic4}
            alt=""
            className="w-16 rounded-xl cursor-pointer"
          />
          <img
            src={assets.pic2}
            alt=""
            className="w-16 rounded-xl cursor-pointer"
          />
          <img
            src={assets.pic3}
            alt=""
            className="w-16 rounded-xl cursor-pointer"
          /> */}
        </div>
      </div>

      <button
        onClick={() => logout()}
        className=" h-4 bottom-5 flex items-center justify-center text-center left-[30%]  bg-[#3b084b] text-white text-[0.75rem] font-extralightt px-7 py-4 rounded-2xl cursor-pointer shadow-2xl hover:bg-[#4c0b5d] transition-all duration-200 active:bg-[#2a0636] max-md:hidden"
      >
        Log Out
      </button>
    </div>
  ) : (
    <div className="rs bg-chat-purple text-amber-50 px-2 py-3 rounded-r-2xl h-[90dvh] w-1/2 relative overflow-y-scroll">
      <button
        onClick={() => logout()}
        className="absolute h-6 top-[50%] flex items-center justify-center text-center left-[30%]  bg-[#077eff] text-white text-[0.75rem] font-extralightt px-7 py-4 rounded-2xl cursor-pointer"
      >
        Log Out
      </button>
    </div>
  );
}

export default RightSideBar;
