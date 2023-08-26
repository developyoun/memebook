
import './../App.css';
import React from "react";
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer>
            <ul className="footer_list">
                <li className="list">
                    <a href="" className="link">
                        Home
                    </a>
                </li>
                <li className="list">
                    <Link to="/word" className="link">Add</Link>
                </li>
                <li className="list">
                    <a href="" className="link">
                        Library
                    </a>
                </li>
                <li className="list">
                    <a href="" className="link">
                        Profile
                    </a>
                </li>
            </ul>
        </footer>
    );
}

export default Footer;
