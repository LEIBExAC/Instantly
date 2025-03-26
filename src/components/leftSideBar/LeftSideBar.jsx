import React from "react";
import assets from "../../assets/assets";

function LeftSideBar() {
  return (
    <div className="ls bg-chat-purple text-amber-50 px-2 py-3 h-full rounded-l-2xl w-1/2 flex flex-col">
      <div className="ls-top p-2">
        <div className="ls-nav flex justify-between items-center mb-7">
          <img src={assets.logo} alt="" className="logo max-w-32" />
          <div className="menu relative py-2 group">
            <img
              src={assets.menu_icon}
              alt=""
              className="max-h-5 opacity-5 cursor-pointer"
            />

            <div className="sub-menu absolute top-full right-0 w-32 p-5 rounded-xl bg-white text-black hidden group-hover:block">
              <p className="text-[0.95rem] cursor-pointer">Edit Profile</p>
              <hr className="bg-[#a4a4a4] my-2" />
              <p className="text-[0.95rem] cursor-pointer">Log Out</p>
            </div>
          </div>
        </div>

        <div className="ls-search bg-search-chat flex items-center gap-3 px-2 py-3 mt-5 rounded-lg">
          <img src={assets.search_icon} alt="" className="w-4" />
          <input
            type="text"
            placeholder="Search here"
            name=""
            id=""
            className="bg-transparent text-white text-sm placeholder:text-[#c8c8c8] outline-none"
          />
        </div>

        <div className="ls-list flex flex-col h-[52%] overflow-hidden overflow-y-scroll mt-7">
          {Array(12)
            .fill("")
            .map((item, index) => (
              <div
                key={index}
                className="friends flex items-center gap-2.5 px-2.5 py-2 cursor-pointer text-[0.95rem] hover:bg-[#077EFF] rounded-xl"
              >
                <img
                  src={assets.profile_img}
                  alt=""
                  className="w-9 aspect-[1/1] rounded-[50%]"
                />

                <div>
                  <p className="flex flex-col">Sammy Jefoe</p>
                  <span className="text-[#9f9f9f] text-[0.85rem]">
                    Hello, man!
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default LeftSideBar;
