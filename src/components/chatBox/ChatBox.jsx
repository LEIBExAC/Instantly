import React, { useContext, useEffect, useState } from "react";
import assets from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";
import upload from "../../lib/upload";

function ChatBox() {
  const {
    userData,
    messagesId,
    chatUser,
    messages,
    setMessages,
    chatVisible,
    setChatVisible,
  } = useContext(AppContext);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    try {
      if (input && messagesId) {
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            text: input,
            createdAt: new Date(),
          }),
        });

        const userIDs = [chatUser.rId, userData.id];

        userIDs.forEach(async (id) => {
          const userChatsRef = doc(db, "chats", id);
          const userChatsSnapshot = await getDoc(userChatsRef);

          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();
            const chatIndex = userChatData.chatData.findIndex(
              (c) => c.messageId === messagesId
            );
            userChatData.chatData[chatIndex].lastMessage = input.slice(0, 30);
            userChatData.chatData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatData[chatIndex].rId === userData.id) {
              userChatData.chatData[chatIndex].messageSeen = false;
            }

            await updateDoc(userChatsRef, {
              chatData: userChatData.chatData,
            });
          }
        });
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
    setInput("");
  };

  const sendImage = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) {
        toast.error("No file selected");
        return;
      }

      await upload(file, ({ imageUrl }) => {
        console.log(imageUrl);
        if (imageUrl) {
          // Proceed with the rest of the logic
          sendImageToFirestore(imageUrl);
        } else {
          toast.error("Failed to retrieve image URL");
        }
      });

      const sendImageToFirestore = async (fileUrl) => {
        // console.log(fileUrl);
        if (fileUrl && messagesId) {
          await updateDoc(doc(db, "messages", messagesId), {
            messages: arrayUnion({
              sId: userData.id,
              image: fileUrl,
              createdAt: new Date(),
            }),
          });

          const userIDs = [chatUser.rId, userData.id];

          userIDs.forEach(async (id) => {
            const userChatsRef = doc(db, "chats", id);
            const userChatsSnapshot = await getDoc(userChatsRef);

            if (userChatsSnapshot.exists()) {
              const userChatData = userChatsSnapshot.data();
              const chatIndex = userChatData.chatData.findIndex(
                (c) => c.messageId === messagesId
              );
              userChatData.chatData[chatIndex].lastMessage = "Image";
              userChatData.chatData[chatIndex].updatedAt = Date.now();
              if (userChatData.chatData[chatIndex].rId === userData.id) {
                userChatData.chatData[chatIndex].messageSeen = false;
              }

              await updateDoc(userChatsRef, {
                chatData: userChatData.chatData,
              });
            }
          });
        }
      };
    } catch (error) {
      toast.error(error.message);
    }
  };

  const convertTimestamp = (timestamp) => {
    let date = timestamp.toDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    if (hour > 12) {
      return hour - 12 < 10
        ? "0" + (hour - 12) + ":" + minute + " PM"
        : hour - 12 + ":" + minute + " PM";
    } else {
      return hour - 12 < 10
        ? "0" + hour + ":" + minute + " AM"
        : hour + ":" + minute + " AM";
    }
  };

  useEffect(() => {
    if (messagesId) {
      const unSub = onSnapshot(doc(db, "messages", messagesId), (res) => {
        setMessages(res.data().messages.reverse());
      });
      return () => {
        unSub();
      };
    }
  }, [messagesId]);

  return chatUser ? (
    <div
      className={`chat-box bg-amber-50 text-black px-2 py-3 h-full w-full relative max-md:rounded-xl max-md:w-full max-md:justify-center ${
        chatVisible ? "" : "max-md:hidden"
      }`}
    >
      <div className="chat-user px-1.5 py-2.5 flex items-center gap-2.5 border-b border-b-gray-300 ">
        <img
          src={chatUser.userData.avatar}
          alt=""
          className="w-8 rounded-[50%] first:w-9 aspect-square"
        />
        <p className="flex-[1] font-bold text-[#393939] flex items-center gap-1.5">
          {chatUser.userData.name}{" "}
          {Date.now() - chatUser.userData.lastSeen <= 70000 ? (
            <img src={assets.green_dot} alt="" className="dot w-3.5 " />
          ) : null}
        </p>
        <img src={assets.help_icon} className="help w-5 max-md:hidden" alt="" />
        <img src={assets.arrow_icon} onClick={() => setChatVisible(false)} className="arrow hidden max-w-6 max-md:block" alt="" />
      </div>

      <div className="chat-msg h-[83%] pb-12 overflow-y-scroll flex flex-col-reverse">
        {messages ? (
          messages.map((msg, index) => {
            return (
              <div
                key={index}
                className={
                  msg.sId === userData.id
                    ? "s-msg flex items-end justify-end gap-1.5 py-3.5"
                    : "r-msg flex items-end gap-1.5 py-3.5 flex-row-reverse justify-end"
                }
              >
                {msg["image"] ? (
                  <div
                    className={
                      msg.sId === userData.id
                        ? "s-msg-image flex items-end justify-end gap-1.5 py-3.5"
                        : "r-msg-image flex items-end gap-1.5 py-3.5 flex-row-reverse justify-end"
                    }
                  >
                    <img
                      src={msg.image}
                      className={
                        msg.sId === userData.id
                          ? "msg-img max-w-[18rem] rounded-2xl rounded-br-none mb-6"
                          : "msg-img max-w-[18rem] rounded-2xl rounded-bl-none mb-6"
                      }
                      alt=""
                    />{" "}
                  </div>
                ) : (
                  <p
                    className={
                      msg.sId === userData.id
                        ? "msg text-white bg-[#077fffc2] p-2 text-sm font-medium rounded-2xl rounded-br-none mr-1 mb-6"
                        : "msg text-white bg-[#1f4f83ad] p-2 text-sm font-medium rounded-2xl rounded-br-none mr-1 mb-6"
                    }
                  >
                    {msg.text}
                  </p>
                )}

                <div className="text-center text-sm min-w-[2rem]">
                  <img
                    src={
                      msg.sId === userData.id
                        ? userData.avatar
                        : chatUser.userData.avatar
                    }
                    alt=""
                    className="w-8 rounded-full aspect-square mb-1"
                  />
                  <p className="text-gray-800 text-[0.65rem]">
                    {convertTimestamp(msg.createdAt)}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p>Hello, There start Chatting now.</p>
        )}
      </div>

      <div className="chat-input flex items-center gap-3 px-2.5 py-3.5 bg-white absolute bottom-0 right-0 left-0 max-md:rounded-xl">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Type a Message"
          className=" placeholder:text-sm flex-[1] outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <input
          onChange={sendImage}
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
        <img
          src={assets.send_button}
          onClick={sendMessage}
          alt=""
          className="w-7 cursor-pointer"
        />
      </div>
    </div>
  ) : (
    <div
      className={`chat-welcome w-full flex flex-col items-center justify-center gap-2 ${
        chatVisible ? "" : "max-md:hidden"
      }`}
    >
      <img src={assets.logo_icon} alt="" className="w-16" />
      <p className="text-xl font-medium text-[#383838]">Chat Instantly</p>
    </div>
  );
}

export default ChatBox;
