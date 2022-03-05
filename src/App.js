import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./Nav";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import MyEndalas from "./pages/MyEndalas";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/gallery" element={<Gallery />}></Route>
          <Route path="/my-endalas" element={<MyEndalas />}>
            <Route path=":tokenId" element={<MyEndalas />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
