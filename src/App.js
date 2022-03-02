import logo from "./logo.svg";
import "./App.css";
import Hero from "./Hero";
import React, { useEffect } from "react";
import { RecoilRoot, selector, useRecoilState, useRecoilValue } from "recoil";
import config from "./config";
import keplrClient from "./utils/KeplrClient";

function App() {
  useEffect(async () => {
    keplrClient(config);
  });

  return (
    <RecoilRoot>
      <div className="App">
        <Hero></Hero>
      </div>
    </RecoilRoot>
  );
}

export default App;
