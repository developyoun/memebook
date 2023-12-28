import Title from "../components/Title";
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Outlet></Outlet>
    </>
  )
}