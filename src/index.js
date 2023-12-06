import React, {useRef} from "react";
import ReactDOM from "react-dom/client";
import DatePicker from "./lib";


const root = ReactDOM.createRoot(document.getElementById("root"));
export default function Index() {
    const formRef = useRef();
    const datePickerRef = useRef();

    function handleResetForm(){
        if (formRef.current && datePickerRef.current) {
            formRef.current.reset();
            datePickerRef.current.resetDatePicker();
        }
    }

    const options = {
        format: "DD/MM/YYYY",
        lang: "fr",
    }

    return (
        <>
            <h1>This is a test component !</h1>
            <form ref={formRef}>
                <label htmlFor="birthdate">Name</label>
                <DatePicker name="birthdate" id="birthdate" options={options} ref={datePickerRef}/>

            </form>
            <br/>
            <button onClick={handleResetForm}>Reset</button>
        </>
    );
}


root.render(
    <React.StrictMode>
        <Index />
    </React.StrictMode>,
);