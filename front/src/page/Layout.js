import '../scss/common.scss';
import Title from "./Title";
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Outlet></Outlet>
    </>
  )
}