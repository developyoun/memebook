import {Outlet} from "react-router-dom";
import {useState} from "react";
import HomeNav from "../components/HomeNav";
import {useTop} from "../util/commonEvent";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout() {
  useTop();
  const [isDark, setIsDark] = useState(false);

  // const darkModeCheck = () => {
  //   setIsDark(!isDark);
  // }
  return (
    <div className="wrap">
      <Header></Header>
      <div className={`content ${isDark ? 'dark' : ''}`}>
        <Outlet></Outlet>
        <HomeNav type="sub"></HomeNav>
      </div>
      <Footer></Footer>
    </div>
  )
}