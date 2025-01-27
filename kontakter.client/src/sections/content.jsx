import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Contacts from './pages/contacts/contacts';
import SignUp from "./pages/signUp/signUp";
import LogIn from "./pages/logIn/logIn";

function Content({ title }) {
    return (
        <div className="content">
            <Routes title={title}>
                <Route path="/" element={<Navigate to="/Kontakter" />} />
                <Route path="/Kontakter" element={<Contacts />} />
                <Route path="/registrer" element={<SignUp />} />
                <Route path="/logginn" element={<LogIn/>} />
            </Routes>
        </div>
    );
}

export default Content;