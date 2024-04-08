import './scss/common.scss';
import './scss/components/darkMode.scss';
import './scss/reset.scss';
import React from "react";
import {Route, Routes} from 'react-router-dom';
import Login from "./page/Login";
import Main from "./page/Main";
import WordAdd from "./page/WordAdd";
import Library from "./page/Library";
import Profile from "./page/Profile";
import WordDetail from "./page/WordDetail";
import ScrapeList from "./page/ScrapeList";
import Layout from "./page/Layout";
import AddList from "./page/AddList";

function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Login/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path="/wordAdd/:id?/:word?" element={<WordAdd/>}/>
        <Route path="/word/:id" element={<WordDetail/>}/>
        <Route path="/library" element={<Library/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/profile/scrape" element={<ScrapeList/>}/>
        <Route path="/profile/my_list" element={<AddList/>}/>
      </Route>
    </Routes>
  );
}

export default App;

