import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import ApiContext from "./contexts/apiContext";

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
