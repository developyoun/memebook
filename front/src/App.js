import './scss/common.scss';
import './scss/reset.scss';
import {Route, Routes} from 'react-router-dom';
import Main from "./page/Main";
import Word from "./page/Word";
import Library from "./page/Library";
import Profile from "./page/Profile";
import React from "react";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/word" element={<Word/>}/>
      <Route path="/library" element={<Library/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
  );
}

export default App;

