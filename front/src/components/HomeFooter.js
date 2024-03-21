import '../scss/components/homeFooter.scss'
import React from "react";
import {Link} from 'react-router-dom';

export default function HomeFooter() {
  return (
    <footer>
      <ul className="footer_list">
        <li className="list">
          <Link to="/main" className="link home">Home</Link>
        </li>
        <li className="list">
          <Link to="/wordAdd" className="link word">Add</Link>
        </li>
        <li className="list">
          <Link to="/library" className="link library">Library</Link>
        </li>
        <li className="list">
          <Link to="/profile" className="link profile">Profile</Link>
        </li>
      </ul>
    </footer>
  );
}
