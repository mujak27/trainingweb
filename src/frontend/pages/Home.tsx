import React from "react";
import { Route, Routes } from 'react-router-dom';
import { AnimeAll } from "../components/anime/AnimeAll";
import { Navigation } from "../components/navigation/Navigation";
import { Login } from "./Login";

type props={

};

export const Home:React.FC<props> = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<><AnimeAll /></>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

