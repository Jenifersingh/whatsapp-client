import React, { useContext, useEffect, useState } from "react";
import { Profile } from "../../components/Profile";
import { SearchBar } from "../../components/Search";
import { ChatProfile } from "../../components/ChatProfile";
import {
  getContacts,
  getUserChatList,
  getUserChats,
} from "../../services/apiCall";
import { Context } from "../../store/Context";
import { ADD_CHAT, ADD_CONTACT, CHAT_USER } from "../../store/action.types";

export const SideBar = () => {
  const [userChats, setUserChats] = useState([]);

  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    getChats();
    getContacts().then((data) => {
      console.log(data);
      dispatch({
        type: ADD_CONTACT,
        payload: data,
      });
    });
  }, []);

  console.log(state);

  const getChats = () => {
    setUserChats(getUserChatList);
  };

  const onSelectChat = (chatUser) => {
    getUserChats().then((data) => {
      console.log(data);
      dispatch({
        type: ADD_CHAT,
        payload: {
          [data._id]: data,
        },
      });
    });
    dispatch({
      type: CHAT_USER,
      payload: {
        chatUser: chatUser,
      },
    });
  };

  return (
    <>
      <div className="profile-container">
        <Profile chatUser={state.user} />
      </div>
      <div>
        <SearchBar />
      </div>
      <div
        style={{
          border: "2px solid #d7dee0",
          height: "570px",
          overflowX: "hidden",
          overflowY: "auto",
          textAlign: "justify",
        }}
      >
        {state.contacts.map((item) => {
          console.log(item);
          return (
            <ChatProfile
              chatUsers={item}
              isSelected={item._id === state.chatUser._id}
              onSelectChat={onSelectChat}
            />
          );
        })}
      </div>
    </>
  );
};
