import './../App.css';
import Header from "./Header";
import {Outlet} from "react-router-dom";

export default function Layout() {
    return (
        <>
            <Header></Header>
            <Outlet></Outlet>
        </>
    )
}