import './scss/common.scss';
import './scss/reset.scss';
import React from "react";
import {Route, Routes} from 'react-router-dom';
import Login from "./page/Login";
import Main from "./page/Main";
import WordAdd from "./page/WordAdd";
import Library from "./page/Library";
import Profile from "./page/Profile";
import WordDetail from "./page/WordDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/main" element={<Main/>}/>
      <Route path="/wordAdd" element={<WordAdd/>}/>
      <Route path="/word/:id" element={<WordDetail/>}/>
      <Route path="/library" element={<Library/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
  );
}

export default App;

