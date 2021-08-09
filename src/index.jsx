import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

window.React = React; // 全局react

ReactDOM.render(<App />, document.getElementById("root"));
