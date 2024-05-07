import '../scss/common.scss'
import {Link} from "react-router-dom";
import React from "react";

export default function Header() {
  return (
    <header className="header">
      <Link to="" className="logo">
        <span className="blind">memebook</span>
      </Link>
      <input type="text" className="search_input" placeholder="단어를 검색해보세요"/>
    </header>
  )
}