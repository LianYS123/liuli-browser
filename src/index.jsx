import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

window.React = React; // 全局react

ReactDOM.render(<App />, document.getElementById("root"));
