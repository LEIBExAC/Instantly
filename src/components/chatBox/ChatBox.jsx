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
    rightSideBarVisible,
    setRightSideBarVisible,
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
      className={`chat-box bg-gray-purple-shading-dark  text-black h-dvh w-full flex flex-col flex-nowrap max-md:w-full max-md:justify-center ${chatVisible ? "" : "max-md:hidden"
        } ${!rightSideBarVisible ? "" : "max-md:hidden"}`}
    >
      <div className="chat-user px-2.5 py-1.5 bg-mid-gray flex items-center gap-2.5 rounded-b-xl shadow-md max-md:rounded-b-xl">
        <div className="flex items-center w-full gap-2.5" onClick={() => {
          setRightSideBarVisible(!rightSideBarVisible);
        }}>
          <img
            src={chatUser.userData.avatar}
            alt=""
            className="w-8 rounded-[50%] first:w-9 aspect-square"
          />
          <p className="flex-[1] font-bold text-amber-100 flex items-center gap-1.5">
            {chatUser.userData.name}{" "}
            {Date.now() - chatUser.userData.lastSeen <= 70000 ? (
              <img src={assets.green_dot} alt="" className="dot w-3.5 " />
            ) : null}
          </p>
        </div>
        <img src={assets.help_icon} className="help w-5 max-md:hidden" alt="" />
        <img src={assets.arrow_icon} onClick={() => setChatVisible(false)} className="arrow hidden max-w-6 max-md:block" alt="" />
      </div>

      <div className="chat-msg grow px-3 overflow-y-scroll flex flex-col-reverse">
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
                        ? "s-msg-image flex items-center justify-end gap-1.5 py-3.5"
                        : "r-msg-image flex items-end gap-1.5 py-3.5 flex-row-reverse justify-end"
                    }
                  >
                    <img
                      src={msg.image}
                      className={
                        msg.sId === userData.id
                          ? "msg-img max-w-[18rem] rounded-2xl rounded-br-sm"
                          : "msg-img max-w-[18rem] rounded-2xl rounded-bl-sm"
                      }
                      alt=""
                    />{" "}
                  </div>
                ) : (
                  <p
                    className={
                      msg.sId === userData.id
                        ? "msg text-white bg-gray-Purple-shading-light p-2 text-sm font-medium rounded-2xl rounded-br-md mr-1 mb-2"
                        : "msg text-gray-purple-shading-dark bg-light-gray p-2 text-sm font-medium rounded-2xl rounded-bl-md mr-1 mb-2"
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
                    className={`w-8 rounded-full aspect-square mb-1 `}
                  />
                  {/* <p className="text-amber-50 text-[0.65rem]">
                    {convertTimestamp(msg.createdAt)}
                  </p> */}
                </div>
              </div>
            );
          })
        ) : (
          <p>Hello, There start Chatting now.</p>
        )}
      </div>

      <div className="chat-input flex items-center gap-3 px-2.5 py-3.5 max-md:rounded-t-xl">
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

        <div className="flex items-center gap-2.5 w-full bg-gray-Purple-shading-light px-3 py-2 rounded-xl shadow-md ">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Type a Message"
            className=" placeholder:text-sm placeholder:text-dark-color flex-[1] outline-none text-sm text-gray-purple-shading-dark"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <img
            src={assets.send_button}
            onClick={sendMessage}
            alt=""
            className="w-7 cursor-pointer"
          />
        </div>

      </div>
    </div>
  ) : (
    <div
      className={`chat-welcome w-full flex bg-gray-purple-shading-dark h-full flex-col items-center justify-center gap-2 ${chatVisible ? "" : "max-md:hidden"
        }`}
    >
      <img src={assets.logo_icon} alt="" className="w-32 opacity-75" />
      <p className="text-4xl font-medium text-[#e4e2e2]">Chat Instantly</p>
    </div>
  );
}

export default ChatBox;
