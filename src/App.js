import logo from "./logo.svg";
import "./App.css";
import Hero from "./Hero";
import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Hero></Hero>
      </div>
    </RecoilRoot>
  );
}

export default App;
