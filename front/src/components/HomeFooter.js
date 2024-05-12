import '../scss/components/homeFooter.scss'
import React, {useEffect, useState} from "react";
import {Link, useLocation, useParams} from 'react-router-dom';

export default function HomeFooter() {
  const location = useLocation();
  const [memberIdx, setMemberIdx] = useState(321);

  return (
    <footer>
      <ul className="footer_list">
        <li className="list">
          <Link to="/main" className={`link home ${location.pathname.startsWith('/main') ? 'active' : ''}`}>
            <span className="blind">홈</span>
          </Link>
        </li>
        <li className="list">
          <Link to="/vocabulary" className={`link vocabulary ${location.pathname.startsWith('/vocabulary') ? 'active' : ''}`}>
            <span className="blind">사전</span>
          </Link>
        </li>
        <li className="list">
          <Link to="/community" className={`link community ${location.pathname.startsWith('/community') ? 'active' : ''}`}>
            <span className="blind">커뮤니티</span>
          </Link>
        </li>
        <li className="list">
          <Link to={`/profile/${memberIdx}`} className={`link profile ${location.pathname.startsWith('/profile') ? 'active' : ''}`}>
            <span className="blind">프로필</span>
          </Link>
        </li>
      </ul>
    </footer>
  );
}