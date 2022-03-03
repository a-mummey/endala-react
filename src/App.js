import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import "./App.css";
import Nav from "./Nav";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import MyEndalas from "./pages/MyEndalas";
import { keplrState, mintedCountState } from "./state";
import asyncKeplrClient from "./utils/AsyncKeplrClient";
import asyncNftHelper from "./utils/AsyncNftHelper";

function App() {
  const setKeplrState = useSetRecoilState(keplrState("state"));
  const setMintedCountState = useSetRecoilState(mintedCountState);
  useEffect(async () => {
    asyncKeplrClient
      .then((c) => {
        console.log(c);
        setKeplrState("loaded");
      })
      .catch((e) => {
        setKeplrState("error");
      });
  });

  useEffect(async () => {
    const helper = await asyncNftHelper();
    helper.getProgress().then((progress) => {
      console.log(progress);
      setMintedCountState(progress.minted);
    });
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/gallery" element={<Gallery />}></Route>
          <Route path="/my-endalas" element={<MyEndalas />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
