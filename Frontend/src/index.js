import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Assets/HoverCss/hover-min.css";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { HTML5Backend } from "react-dnd-html5-backend";
import {DndProvider } from "react-dnd";
ReactDOM.render(
  <Provider store={store}>
  <DndProvider backend={HTML5Backend}>
  <App />
</DndProvider>
  </Provider>,
  document.getElementById("root")
);
