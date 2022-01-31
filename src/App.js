import logo from "./logo.svg";
import "./App.css";
import { Home } from "../src/pages";
import { useReducer } from "react";
import { Context } from "./store/Context";
import { reducer } from "./store/reducer";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

function App() {
  const initialState = {
    user: {},
    chatUser: {},
    isAuthenticated: false,
    contacts: [],
    chats: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Router>
        <div>
          <div className="header-container"></div>
          <Routes>
            <Route element={<Home />} path={"/"} />
            <Route element={<SignIn />} path={"/signin"} />
            <Route element={<SignUp />} path={"/signup"} />
          </Routes>
        </div>
      </Router>
    </Context.Provider>
  );
}

export default App;
