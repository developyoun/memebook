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
import MyAddList from "./page/MyAddList";
import Community from "./page/Community";
import PostDetail from "./page/PostDetail";

function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Login/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path="/wordAdd/:id?/:word?" element={<WordAdd/>}/>
        <Route path="/word/:id" element={<WordDetail/>}/>
        <Route path="/library" element={<Library/>}/>
        <Route path="/community" element={<Community/>}/>
        <Route path="/postDetail" element={<PostDetail/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
        <Route path="/profile/scrape" element={<ScrapeList/>}/>
        <Route path="/profile/my_list" element={<MyAddList/>}/>
      </Route>
    </Routes>
  );
}

export default App;

