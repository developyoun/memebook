import './scss/common/common.scss';
import './scss/components/darkMode.scss';
import './scss/common/reset.scss';
import React from "react";
import {Route, Routes} from 'react-router-dom';
import Login from "./page/Login";
import Main from "./page/Main";
import WordAdd from "./page/WordAdd";
import Vocabulary from "./page/Vocabulary";
import Profile from "./page/Profile";
import WordInfo from "./page/WordInfo";
import MyScrapeList from "./page/MyScrapeList";
import Layout from "./page/Layout";
import MyAddList from "./page/MyAddList";
import Community from "./page/Community";
import PostInfo from "./page/PostInfo";
import PostAdd from "./page/PostAdd";
import MyPostList from "./page/MyPostList";
import MyCommentList from "./page/MyCommentList";

function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Login/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path="/vocabulary/wordAdd/:id?/:word?" element={<WordAdd/>}/>
        <Route path="/vocabulary/wordInfo/:id" element={<WordInfo/>}/>
        <Route path="/vocabulary" element={<Vocabulary/>}/>
        <Route path="/community" element={<Community/>}/>
        <Route path="/community/postAdd/:id?" element={<PostAdd/>}/>
        <Route path="/profile/:id" element={<Profile/>}/>
        <Route path="/profile/scrape" element={<MyScrapeList/>}/>
        <Route path="/profile/my_list" element={<MyAddList/>}/>
        <Route path="/profile/myPostList" element={<MyPostList/>}/>
        <Route path="/profile/myCommentList" element={<MyCommentList/>}/>
      </Route>
      <Route path="/community/postDetail/:id" element={<PostInfo/>}/>
    </Routes>
  );
}

export default App;

