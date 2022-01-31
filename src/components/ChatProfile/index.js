import React from "react";
import "./chatProfile.css";
import { formatDate } from "../../utils/formatDate";
const PROFILE_PIC = require("../../assets/profile.png");

export const ChatProfile = (props) => {
  return (
    <div
      className={`profile-grid-container ${props.isSelected ? "selected" : ""}`}
      onClick={() => props.onSelectChat(props.chatUsers)}
    >
      <div className="chat-profile-pic">
        <img src={PROFILE_PIC} alt="profile pic" className="profile-pic" />
      </div>
      <div className="conversation-msg-view">
        <div>
          <span className="username-conversation">{props.chatUsers.name}</span>
          <span className="conversation-time">
            {formatDate(props.chatUsers.time)}
          </span>
        </div>
        <div className="last-conversation">{props.chatUsers.lastMessage}</div>
      </div>
    </div>
  );
};
