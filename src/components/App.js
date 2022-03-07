import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./Nav";
import About from "../pages/About";
import Home from "../pages/Home";
import Gallery from "../pages/Gallery";
import StateSubscriber from "./StateSubscriber";
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <StateSubscriber></StateSubscriber>
      <BrowserRouter>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/nft" element={<Gallery />}>
            <Route path=":tokenId" element={<Gallery />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
