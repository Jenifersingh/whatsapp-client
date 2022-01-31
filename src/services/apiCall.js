import { authorization } from "../test/authorization";
import { chatUser } from "../test/chatUser";
import { chats } from "../test/chats";
import { users } from "../test/users";
import Cookies from "universal-cookie";
const API_ENABLED = false;
const API = "";
export const cookies = new Cookies();

export const signIn = (user) => {
  if (!API_ENABLED) return authorization;
};

export const signUp = (user) => {
  return "";
};

export const getUserChatList = () => {
  if (!API_ENABLED) return chatUser;
};

export const getUsersList = (user) => {
  if (!API_ENABLED) return users;
};

export const getUserChats = (userId) => {
  if (!API_ENABLED) return Promise.resolve(chats);
};

export const validateUser = () => {
  if (!API_ENABLED)
    return {
      _id: localStorage.getItem("userId"),
      status: true,
      name: "Saravanan Test",
      profilePic: "",
    };
};

export const getContacts = () => {
  return Promise.resolve([
    {
      _id: "61f6df1be7dfcbaa7f6fab05",
      number: "8870097219",
      name: "Jenifer",
      __v: 0,
      lastMessage: "Hello",
    },
    {
      _id: "61f5727d9791c6e526983195",
      number: "8870097220",
      name: "Singh",
      __v: 0,
      lastMessage: "",
    },
  ]);
};
