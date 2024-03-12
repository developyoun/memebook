import {Outlet} from "react-router-dom";
import DarkMode from "../components/DardMode";
import {useState} from "react";

export default function Layout() {
  const [isDark, setIsDark] = useState(false);

  const darkModeCheck = () => {
    setIsDark(!isDark);
  }
  return (
    <>
      <div id="wrap" className={`wrap ${isDark ? 'dark' : ''}`}>
        <DarkMode darkModeCheck={darkModeCheck}/>
        <Outlet></Outlet>
      </div>
    </>
  )
}