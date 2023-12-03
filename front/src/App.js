import './App.css';
import {Route, Routes} from 'react-router-dom';
import Main from "./page/Main";
import Word from "./page/Word";
import Library from "./page/Library";
import Profile from "./page/Profile";
import React from "react";
import Layout from "./page/Layout";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route element={<Layout/>}>
                <Route path="/word" element={<Word/>}/>
                <Route path="/library" element={<Library/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Route>
        </Routes>
    )
}

export default App;
