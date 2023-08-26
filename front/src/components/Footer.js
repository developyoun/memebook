
import './../App.css';
import React from "react";
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer>
            <ul className="footer_list">
                <li className="list">
                    <Link to="/" className="link">Home</Link>
                </li>
                <li className="list">
                    <Link to="/word" className="link">Add</Link>
                </li>
                <li className="list">
                    <Link to="/library" className="link">Library</Link>
                </li>
                <li className="list">
                    <Link to="/profile" className="link">Profile</Link>
                </li>
            </ul>
        </footer>
    );
}

export default Footer;
