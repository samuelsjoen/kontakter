import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Contacts from "./pages/contacts/contacts";
import SignUp from "./pages/signUp/signUp";
import LogIn from "./pages/logIn/logIn";
import LogOut from "./pages/logOut/logOut";

import ProtectedRoute from "./protectedRoute";

/**
 * A component containing content of the website. This includes log in, sign up, log out and contact pages
 * @param {*} title The title of the website 
 * @returns the content view
 */
function Content({ title }) {
    return (
        <div className="content">
            <Routes title={title}>
                <Route path="/" element={<Navigate to="/logginn" />} />
                <Route path="/Kontakter" element={
                    <ProtectedRoute>
                        <Contacts />
                    </ProtectedRoute>} />
                <Route path="/registrer" element={<SignUp />} />
                <Route path="/logginn" element={<LogIn/>} />
                <Route path="/loggut" element={
                    <ProtectedRoute>
                        <LogOut/>
                    </ProtectedRoute>} />
            </Routes>
        </div>
    );
}

export default Content;