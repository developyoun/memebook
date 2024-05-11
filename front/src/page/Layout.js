import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import HomeFooter from "../components/HomeFooter";
import {useTop} from "../util/commonEvent";

export default function Layout() {
  useTop();
  const [isDark, setIsDark] = useState(false);

  const darkModeCheck = () => {
    setIsDark(!isDark);
  }
  return (
    <>
      <div id="wrap" className={`wrap ${isDark ? 'dark' : ''}`}>
        {/*<DarkMode darkModeCheck={darkModeCheck}/>*/}
        <Outlet></Outlet>
        <HomeFooter></HomeFooter>
      </div>
    </>
  )
}