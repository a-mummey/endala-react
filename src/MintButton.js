import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import "./MintButton.css";
import { keplrState, mintedCountState } from "./state";
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
  const kState = useRecoilValue(keplrState("state"));
  const setKeplrState = useSetRecoilState(keplrState("state"));
  const setTokenId = useSetRecoilState(keplrState("tokenId"));
  const setMintedCountState = useSetRecoilState(mintedCountState);
  // const [kState, setKeplrState] = useRecoilState(keplrState);
  const buttonState = mintStates[kState] || mintStates.loading;
  const Mint = async () => {
    setKeplrState("minting");
    const nftHelper = await asyncNftHelper();
    nftHelper
      .mintSender()
      .then((tokenId) => {
        setKeplrState("loaded");
        setTokenId(tokenId);
        nftHelper.getProgress().then((progress) => {
          setMintedCountState(progress.minted);
        });
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
