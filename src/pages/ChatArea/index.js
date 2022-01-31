import React, { useContext, useEffect, useState } from "react";
import "./chatArea.css";
import { SendIcon } from "../../components/SendIcon";
import { Profile } from "../../components/Profile";
import { Chats } from "../../components/Chats";
import { Context } from "../../store/Context";
import { getUserChats } from "../../services/apiCall";
import { ADD_CHAT } from "../../store/action.types";

export const ChatArea = ({ webSocket }) => {
  const [message, setMessage] = useState("");

  const [userChats, setUserChats] = useState([]);

  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    // getChats();
  }, []);

  const getChats = () => {
    const userId = state.chatUser.id;
    const chats = getUserChats(userId);
    setUserChats(chats);
  };

  const onSend = (e) => {
    e.preventDefault();
    webSocket.send(
      JSON.stringify({
        senderId: state.user._id,
        recieverId: state.chatUser._id,
        message: message,
        type: "send",
      })
    );

    let convId = "";

    if (state.chats[`${state.user._id}${state.chatUser._id}`]) {
      convId = `${state.user._id}${state.chatUser._id}`;
    } else if (state.chats[`${state.chatUser._id}${state.user._id}`]) {
      convId = `${state.chatUser._id}${state.user._id}`;
    }

    let payload = {
      [convId]: {
        _id: convId,
        message: [
          ...state.chats[convId].message,
          {
            senderId: state.user._id,
            recieverId: state.chatUser._id,
            value: message,
            type: "send",
          },
        ],
      },
    };

    dispatch({
      type: ADD_CHAT,
      payload: payload,
    });
    setMessage("");
  };

  console.log(state);

  let currentChat =
    state.chats[`${state.user._id}${state.chatUser._id}`] ||
    state.chats[`${state.chatUser._id}${state.user._id}`] ||
    {};

  return (
    <div className="chat-area-container">
      <div style={{ background: "#F0F2F5", padding: "10px" }}>
        <Profile chatUser={state.chatUser} />
      </div>
      <div className="chats-background-container">
        <Chats
          userChats={currentChat.message || []}
          chatUser={state.chatUser}
        />
      </div>
      <div className="message-type-container">
        <form onSubmit={onSend}>
          <input
            type="text"
            placeholder="Type a message"
            style={{ width: "90%", padding: "10px" }}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {message ? <SendIcon /> : null}
        </form>
      </div>
    </div>
  );
};
