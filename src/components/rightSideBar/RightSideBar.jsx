import React from "react";
import assets from "../../assets/assets";

function RightSideBar() {
  return (
    <div className="rs bg-chat-purple text-amber-50 px-2 py-3 rounded-r-2xl h-[90dvh] w-1/2 relative overflow-y-scroll">
      <div className="rs-profile pt-16 text-center max-w-[70%] m-auto flex items-center flex-col">
        <img src={assets.profile_img} alt="" className="w-28 rounded-full" />
        <h3 className="font-light flex items-center justify-center gap-1.5 mx-1.5">
          Sammy Jeis <img src={assets.green_dot} alt="" />
        </h3>
        <p className="text-[0.75rem] opacity-80 font-light">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit,
          dolor!
        </p>
      </div>

      <hr className="border border-[#ffffff50] mx-3.5 my-3.5" />

      <div className="rs-media py-5 px-5 text-[0.85rem]">
        <p>Media</p>
        <div className="max-h-44 overflow-y-scroll grid grid-cols-[1fr_1fr_1fr] gap-2 mt-2">
          <img
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
          />
        </div>
      </div>

      <button className="absolute h-4 bottom-5 flex items-center justify-center text-center left-[30%]  bg-[#077eff] text-white text-[0.75rem] font-extralightt px-7 py-4 rounded-2xl cursor-pointer">
        Log Out
      </button>
    </div>
  );
}

export default RightSideBar;
