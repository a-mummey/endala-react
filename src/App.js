import logo from "./logo.svg";
import "./App.css";
import Hero from "./Hero";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { keplrState, mintedCountState } from "./state";
import asyncNftHelper from "./utils/AsyncNftHelper";
import asyncKeplrClient from "./utils/AsyncKeplrClient";

function App() {
  const setKeplrState = useSetRecoilState(keplrState);
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
      <Hero></Hero>
    </div>
  );
}

export default App;
