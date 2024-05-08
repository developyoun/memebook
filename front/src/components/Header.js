import '../scss/common.scss'
import {Link} from "react-router-dom";
import React from "react";

export default function Header(props) {
  return (
    <header className="header">
      <Link to="/main" className="logo">
        <span className="blind">memebook</span>
      </Link>
      {
        props.searchState !== 'searchNone' && (
          <input type="text" className="search_input" placeholder="단어를 검색해보세요"/>
        )
      }
    </header>
  )
}