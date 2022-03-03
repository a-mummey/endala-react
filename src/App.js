import logo from "./logo.svg";
import "./App.css";
import Hero from "./Hero";
import MintBody from "./MintBody";
import Nav from "./Nav";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { keplrState, mintedCountState } from "./state";
import asyncNftHelper from "./utils/AsyncNftHelper";
import asyncKeplrClient from "./utils/AsyncKeplrClient";

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
      <Nav></Nav>
      <Hero></Hero>
      <MintBody></MintBody>
    </div>
  );
}

export default App;
