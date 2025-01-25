import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

function NavBar({ title }) {
    return (
        <div className="navBar">
            <Banner title={title} link="/kontakter" />
            <div className="buttons">
                <NavBarButton title="Registrer" link="/registrer"/>
                <NavBarButton title="Logg inn" link="/logginn"/>
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