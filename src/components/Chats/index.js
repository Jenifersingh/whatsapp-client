import React from "react";
import "./chats.css";
import { formatDate } from "../../utils/formatDate";

export const Chats = ({ userChats, chatUser }) => {
  return (
    <>
      {userChats.map((item) => (
        <>
          {item.senderId === chatUser._id ? (
            <div className="chats-container">
              <span style={{ left: "-10px" }}></span>
              <span className="chats">
                {item.value}
                <span className="chat-time">{formatDate(item.dateTime)}</span>
              </span>
            </div>
          ) : (
            <div className="chats-container" style={{ float: "right" }}>
              <span className="chats">
                {item.value}
                <span className="chat-time">{formatDate(item.dateTime)}</span>
              </span>
            </div>
          )}
        </>
      ))}
    </>
  );
};
