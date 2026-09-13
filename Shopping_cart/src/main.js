import React from "react";
import ReactDOM from "react-dom/client";


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import ShoppingComponent from "./ShoppingComponent";

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(
    <React.StrictMode>
        <ShoppingComponent />
    </React.StrictMode>
);
