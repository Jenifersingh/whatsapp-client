import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react/cjs/react.development";
import { Context } from "../store/Context";
import { ChatArea } from "./ChatArea";
import { SideBar } from "./SideBar";
import { LandChatScreen } from "../components/LandChatScreen";
import { cookies } from "../services/apiCall";
import { USER_INFO, IS_AUTHENTICATE, ADD_CHAT } from "../store/action.types";
import { validateUser } from "../services/apiCall";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(Context);

  let wsRef = useRef();

  useEffect(() => {
    wsRef.current = new WebSocket("ws:\\127.0.0.1:8080");

    console.log(wsRef.current);
    console.log(state.chats);

    wsRef.current.addEventListener("open", () => {
      wsRef.current.send(
        JSON.stringify({
          senderId: state.user._id,
          type: "init",
        })
      );
    });

    if (!state.isAuthenticated) {
      const user = validateUser();
      dispatch({
        type: USER_INFO,
        payload: {
          user: user,
        },
      });
      dispatch({
        type: IS_AUTHENTICATE,
        payload: {
          isAuthenticated: user.status,
        },
      });
    } else if (!state.isAuthenticated && !cookies.get("Authorization")) {
      navigate("/signin");
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    wsRef.current.addEventListener("message", (e) => {
      let recievedData = JSON.parse(e.data);
      console.log(state.chats);
      let existingData = state.chats[recievedData._id]?.message || [];
      let payload = {
        [recievedData._id]: {
          _id: recievedData._id,
          message: [
            ...existingData,
            {
              senderId: recievedData.senderId,
              recieverId: recievedData.recieverId,
              value: recievedData.message,
            },
          ],
        },
      };

      dispatch({
        type: ADD_CHAT,
        payload: payload,
      });
    });
  }, [state.chats]);

  return (
    <>
      <div className="grid-container">
        <div className="side-area-container">
          <SideBar />
        </div>
        <div className="chat-area-container">
          {state.chatUser._id ? (
            <ChatArea webSocket={wsRef.current} />
          ) : (
            <LandChatScreen />
          )}
        </div>
      </div>
    </>
  );
};
