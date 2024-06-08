import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import HomeNav from "../components/HomeNav";
import {useTop} from "../util/commonEvent";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout() {
  useTop();
  const [isDark, setIsDark] = useState(false);

  const darkModeCheck = () => {
    setIsDark(!isDark);
  }
  return (
    <>
      <Header></Header>
      <div id="wrap" className={`wrap ${isDark ? 'dark' : ''}`}>
        {/*<DarkMode darkModeCheck={darkModeCheck}/>*/}
        <Outlet></Outlet>
        <HomeNav type="sub"></HomeNav>
      </div>
    </>
  )
}