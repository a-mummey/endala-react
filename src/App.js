import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import "./App.css";
import Nav from "./Nav";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import MyEndalas from "./pages/MyEndalas";
import {
  keplrState,
  mintedCountState,
  raritiesState,
  userAccountState,
} from "./state";
import asyncKeplrClient from "./utils/AsyncKeplrClient";
import asyncNftHelper from "./utils/AsyncNftHelper";
import log from "loglevel";

function App() {
  const setKeplrState = useSetRecoilState(keplrState("state"));
  const setMintedCountState = useSetRecoilState(mintedCountState);
  const setRaritiesState = useSetRecoilState(raritiesState);
  const setUserAccountState = useSetRecoilState(userAccountState);
  useEffect(async () => {
    try {
      // Load the keplr client
      const client = await asyncKeplrClient;
      log.debug(client);
      setKeplrState("loaded");
      // Load the user's STARS Account
      const accounts = await client.offlineSigner.getAccounts();
      log.debug(accounts);
      if (Array.isArray(accounts) && accounts[0]) {
        setUserAccountState(accounts[0].address);
      } else {
        log.error("Could not load accounts from Keplr");
        setKeplrState("error");
      }
    } catch (e) {
      log.error(e);
      setKeplrState("error");
    }
  });

  useEffect(async () => {
    const helper = await asyncNftHelper();
    helper.getProgress().then((progress) => {
      log.debug(progress);
      setMintedCountState(progress.minted);
    });
    helper.getAllRarities().then((rJson) => {
      log.debug(rJson);
      setRaritiesState(rJson);
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
