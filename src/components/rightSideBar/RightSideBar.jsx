import React, { useContext, useEffect, useState } from "react";
import assets from "../../assets/assets";
import { logout } from "../../config/firebase";
import { AppContext } from "../../context/AppContext";

function RightSideBar() {
  const { chatUser, messages } = useContext(AppContext);
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
    <div className="rs bg-chat-purple text-amber-50 px-2 py-3 rounded-r-2xl h-[90dvh] w-1/2 relative overflow-y-scroll max-md:hidden">
      <div className="rs-profile pt-16 text-center max-w-[70%] m-auto flex items-center flex-col">
        <img
          src={chatUser.userData.avatar}
          alt=""
          className="w-28 rounded-full aspect-square mb-2"
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

      <hr className="border border-[#ffffff50] mx-3.5 my-3.5" />

      <div className="rs-media py-5 px-5 text-[0.85rem]">
        <p>Media</p>
        <div className="max-h-44 overflow-y-scroll grid grid-cols-[1fr_1fr_1fr] gap-2 mt-2">
          {msgImages.map((url, index) => (
            <img
              onClick={() => window.open(url)}
              key={index}
              src={url}
              alt=""
              className="w-16 aspect-[7/6] rounded-xl cursor-pointer "
            />
          ))}
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
        className="absolute h-4 bottom-5 flex items-center justify-center text-center left-[30%]  bg-[#077eff] text-white text-[0.75rem] font-extralightt px-7 py-4 rounded-2xl cursor-pointer"
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
