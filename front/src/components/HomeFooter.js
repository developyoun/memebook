import '../scss/components/homeFooter.scss'
import React, {useState} from "react";
import {Link} from 'react-router-dom';

export default function HomeFooter() {
  const [memberIdx, setMemberIdx] = useState('123');

  return (
    <footer>
      <ul className="footer_list">
        <li className="list">
          <Link to="/main" className="link home">
            <span className="blind">홈</span>
          </Link>
        </li>
        <li className="list">
          <Link to="/library" className="link library">
            <span className="blind">사전</span>
          </Link>
        </li>
        <li className="list">
          <Link to="/community" className="link community">
            <span className="blind">커뮤니티</span>
          </Link>
        </li>
        <li className="list">
          <Link to={`/profile/${memberIdx}`} className="link profile">
            <span className="blind">프로필</span>
          </Link>
        </li>
      </ul>
    </footer>
  );
}