import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from "../page/Main";
import Word from "../page/Word";
import Library from "../page/Library";
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/word" element={<Word />} />
            <Route path="/library" element={<Library />} />
        </Routes>
    );
};

export default AppRoutes;