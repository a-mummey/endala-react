import React from "react";
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import "./MintButton.css";
import { keplrState, mintedCountState, lastMintedTokenIdState } from "./state";
import asyncNftHelper from "./utils/AsyncNftHelper";
import log from "loglevel";

const mintStates = {
  loaded: {
    label: "Mint",
    disabled: false,
  },
  loading: {
    label: "Loading...",
    disabled: true,
  },
  minting: {
    label: "Minting...",
    disabled: true,
  },
  error: {
    label: "Error",
    disabled: true,
  },
};

function MintButton() {
  const resetMintedCount = useResetRecoilState(mintedCountState);
  const kState = useRecoilValue(keplrState);
  const setKeplrState = useSetRecoilState(keplrState);
  const setLastMintedTokenId = useSetRecoilState(lastMintedTokenIdState);
  const buttonState = mintStates[kState] || mintStates.loading;

  const Mint = async () => {
    setKeplrState("minting");
    const nftHelper = await asyncNftHelper();
    nftHelper
      .mintSender()
      .then((tokenId) => {
        setKeplrState("loaded");
        setLastMintedTokenId(tokenId);
        resetMintedCount();
      })
      .catch((e) => {
        if (e.message === "Request rejected") {
          log.debug("Request rejected, reloading");
          setKeplrState("loaded");
        } else {
          log.error(e);
          setKeplrState("error");
        }
      });
  };
  return (
    <button
      className="mintButton"
      aria-busy={buttonState.disabled}
      role="button"
      disabled={buttonState.disabled}
      onClick={Mint}
    >
      {buttonState.label}
    </button>
  );
}

export default MintButton;
