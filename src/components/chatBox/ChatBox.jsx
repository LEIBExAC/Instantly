import React from "react";
import assets from "../../assets/assets";

function ChatBox() {
  return (
    <div className="chatbox bg-amber-50 text-black px-2 py-3 h-full w-full relative">
      <div className="chat-user px-1.5 py-2.5 flex items-center gap-2.5 border-b border-b-gray-300 ">
        <img
          src={assets.profile_img}
          alt=""
          className="w-8 rounded-[50%] first:w-9 aspect-square"
        />
        <p className="flex-[1] font-bold text-[#393939] flex items-center gap-1.5">
          Sammy Feis <img src={assets.green_dot} alt="" className="w-3.5" />
        </p>
        <img src={assets.help_icon} className="help w-5" alt="" />
      </div>

      <div className="chat-msg h-[83%] pb-12 overflow-y-scroll flex flex-col-reverse">
        <div className="s-msg flex items-end justify-end gap-1.5 py-3.5">
          <p className="msg text-white bg-[#077EFF] p-2 text-sm font-medium rounded-2xl rounded-br-none mr-1 mb-6">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas
            obcaecati magnam, ea porro libero mollitia architecto ratione ipsa
            dicta ducimus.
          </p>

          <div className="text-center text-sm min-w-[2rem]">
            <img src={assets.profile_img} alt="" className="w-8 rounded-full" />
            <p>2:30 PM</p>
          </div>
        </div>

        <div className="s-msg flex items-end justify-end gap-1.5 py-3.5">
          <img src={assets.pic1} className="msg-img max-w-[18rem] rounded-2xl rounded-br-none mb-6 " alt="" />
          <div className="text-center text-sm min-w-[2rem]">
            <img src={assets.profile_img} alt="" className="w-8 rounded-full" />
            <p>2:30 PM</p>
          </div>
        </div>

        <div className="r-msg flex items-end gap-1.5 py-3.5 flex-row-reverse  justify-end">
          <p className="msg text-white bg-[#077EFF] p-2 text-sm font-medium rounded-2xl rounded-bl-none mr-1 mb-6">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas
            obcaecati magnam, ea porro libero mollitia architecto ratione ipsa
            dicta ducimus.
          </p>

          <div className="text-center text-sm min-w-[2rem]">
            <img src={assets.profile_img} alt="" className="w-8 rounded-full" />
            <p>2:30 PM</p>
          </div>
        </div>
       
        <div className="r-msg flex items-end gap-1.5 py-3.5 flex-row-reverse justify-end">
        <img src={assets.pic2} className="msg-img max-w-[18rem] rounded-2xl rounded-bl-none mb-6 " alt="" />
         

          <div className="text-center text-sm min-w-[2rem]">
            <img src={assets.profile_img} alt="" className="w-8 rounded-full" />
            <p>2:30 PM</p>
          </div>
        </div>
      </div>

      <div className="chat-input flex items-center gap-3 px-2.5 py-3.5 bg-white absolute bottom-0 right-0 left-0">
        <input
          type="text"
          placeholder="Type a Message"
          className=" placeholder:text-sm flex-[1] outline-none"
        />
        <input
          type="file"
          name=""
          id="image"
          accept="image/png, image/jgp"
          hidden
        />
        <label htmlFor="image" className="flex ">
          <img
            src={assets.gallery_icon}
            alt=""
            className="w-7 cursor-pointer"
          />
        </label>
        <img src={assets.send_button} alt="" className="w-7 cursor-pointer" />
      </div>
    </div>
  );
}

export default ChatBox;
