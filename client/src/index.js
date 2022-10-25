import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { createTheme, ThemeProvider } from "@mui/material";

import { reducers } from "./store/reducers";
import "./index.css";
import App from "./App";

// For redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const theme = createTheme({
  typography: {
    fontFamily: "var(--fontFamily-nunito-bold)",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: "#F76C6C",
          fontFamily: "var(--fontFamily-nunito-bold)",
          fontSize: "20px",
          color: "#fefefe",
          borderRadius: "40px",
          textAlign: "center",
          display: "inline-block",
          padding: "15px 40px",
          cursor: "pointer",
          letterSpacing: "2px",
          position: "relative",
          overflow: "hidden",
          margin: "20px",
          "&:before": {
            content: '""',
            position: "absolute",
            height: "150px",
            width: "50px",
            background: "#fefefe",
            left: "-55px",
            top: "-40px",
            transform: "rotate(37deg)",
            transition: "all .3s",
            opacity: 0.3,
          },
          "&:hover:before": {
            left: "95%",
          },
          "&:hover": {
            backgroundColor: "rgba(247, 108, 108, 0.2)",
            color: "#F76C6C",
          },
          "&:disabled": {
            backgroundColor: "#D8D8D8",
            color: "#7B7B7B",
          },
        },
      },
      variants: [
        {
          props: { variant: "cancelButton" },
          style: {
            padding: "10px 35px",
            fontSize: "15px",
          },
        },
        {
          props: { variant: "submitButton" },
          style: {
            padding: "10px 35px",
            fontSize: "15px",
            backgroundColor: "#aedcae",
            "&:hover": {
              backgroundColor: "rgba(108, 191, 108, 0.2)",
              color: "#6cbf6c",
            },
          },
        },
        {
          props: { variant: "colorButton" },
          style: {
            padding: "10px 35px",
            fontSize: "15px",
            margin: "0px",
          },
        },
      ],
    },
  },
  palette: {
    primary: {
      main: "#FF9398",
    },
    secondary: {
      main: "#FF9398",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
