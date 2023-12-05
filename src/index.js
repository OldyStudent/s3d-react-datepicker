import React from "react";
import ReactDOM from "react-dom/client";
import DatePicker from "./lib";

const root = ReactDOM.createRoot(document.getElementById("root"));
export default function Index() {
    return (
        <>
            <h1>This is a test component !</h1>
            <DatePicker />
        </>
    );
}


root.render(
    <React.StrictMode>
        <Index />
    </React.StrictMode>,
);