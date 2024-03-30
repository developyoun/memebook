import '../scss/components/homeFooter.scss'
import React from "react";
import {Link} from 'react-router-dom';

export default function HomeFooter() {
  return (
    <footer>
      <ul className="footer_list">
        <li className="list">
          <Link to="/main" className="link home">홈</Link>
        </li>
        <li className="list">
          <Link to="/library" className="link library">사전</Link>
        </li>
        <li className="list">
          <Link to="/library" className="link community">커뮤니티</Link>
        </li>
        <li className="list">
          <Link to="/profile" className="link profile">프로필</Link>
        </li>
      </ul>
    </footer>
  );
}
