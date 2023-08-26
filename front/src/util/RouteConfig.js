import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from "../page/Main";
import Word from "../page/Word";
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/word" element={<Word />} />
        </Routes>
    );
};

export default AppRoutes;