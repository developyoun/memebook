import '../scss/common.scss';
import './../scss/homeFooter.scss'
import React from "react";
import {Link} from 'react-router-dom';

export default function HomeFooter() {
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
