import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import Exhibit from "./pages/Exhibit";
import Article from "./pages/Article";
import Gallery from "./pages/Gallery";

export default function CrossRoad() {

  return (
    <MantineProvider theme={{
      colorScheme: 'dark',
      colors: {
        'background': ['#0F1022'],
        'secondary': ['#272B45'],
        'white': ['#FFFFFF'],
      },
      fontFamily: "athelas",
    }}>
      <Router>
        <Routes>
          <Route path='/' element={<Exhibit />} />
          <Route path='/exhibit' element={<Exhibit />} />
          <Route path="/article" element={<Article />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </Router>
    </MantineProvider>
  )
}
