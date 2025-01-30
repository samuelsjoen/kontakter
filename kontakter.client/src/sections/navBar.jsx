import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";

function NavBar({ title }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
      fetch("https://localhost:7213/api/auth/check-auth", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setIsAuthenticated(data.isAuthenticated))
        .catch(() => setIsAuthenticated(false));
    }, []);

    return (
        <div className="navBar">
            <Banner title={title} link="/Kontakter" />
            <div className="buttons">
                {isAuthenticated ? (
                    <NavBarButton title="Logg ut" link="/loggut" />
                ) : (
                    <>
                        <NavBarButton title="Registrer" link="/registrer" />
                        <NavBarButton title="Logg inn" link="/logginn" />
                    </>
                )}
            </div>
        </div>
    );
}

function Banner({ title, link }) {
    return (
        <Link to={link} className="banner">
            {title}
        </Link>
    );
}

function NavBarButton({ title, link }) {
    return (
        <Link to={link} className="navBarButton">
            {title}
        </Link>
    );
}

export default NavBar;