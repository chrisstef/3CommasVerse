import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router } from "react-router-dom"; // In order to use links we need to wrap our app with react-router.
import { Provider } from "react-redux";

import App from "./App";
import store from "./app/store";
import "antd/dist/antd.css";

ReactDom.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <App />
            </Provider>
        </Router>
        ,
    </React.StrictMode>,
    document.getElementById("root")
);
