import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./Nav";
import About from "../pages/About";
import Home from "../pages/Home";
import NftInfo from "../pages/NftInfo";
import Gallery from "../pages/Gallery";
import StateSubscriber from "./StateSubscriber";
import Footer from "./Footer";
import KeplrErrorModal from "../components/KeplrErrorModal";

function App() {
  return (
    <div className="App">
      <StateSubscriber></StateSubscriber>
      <BrowserRouter>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/nft/:tokenId" element={<NftInfo />}></Route>
          <Route path="/gallery" element={<Gallery />}>
            <Route path="/gallery/:page" element={<Gallery />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
      <KeplrErrorModal></KeplrErrorModal>
    </div>
  );
}

export default App;
