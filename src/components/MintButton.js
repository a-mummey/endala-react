import log from "loglevel";
import React from "react";
import {
  useRecoilValueLoadable,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import "./MintButton.css";
import {
  keplrDerviedState,
  newTokenAddedSelector,
  mintedCountState,
} from "../state";
import asyncNftHelper from "../utils/AsyncNftHelper";

const mintStates = {
  loaded: {
    label: "Mint",
    disabled: false,
    loading: false,
  },
  loading: {
    label: "Loading...",
    disabled: true,
    loading: true,
  },
  minting: {
    label: "Minting...",
    disabled: true,
    loading: true,
  },
  error: {
    label: "Error",
    disabled: true,
    loading: false,
  },
};

function MintButton() {
  const resetMintedCount = useResetRecoilState(mintedCountState);
  const kState = useRecoilValueLoadable(keplrDerviedState);
  const setKeplrState = useSetRecoilState(keplrDerviedState);
  const setNewToken = useSetRecoilState(newTokenAddedSelector);

  const buttonState =
    kState.map((s) => mintStates[s]).valueMaybe() || mintStates.loading;

  const Mint = async () => {
    setKeplrState("minting");
    const nftHelper = await asyncNftHelper();
    try {
      nftHelper
        .mintSender()
        .then((tokenId) => {
          setNewToken(tokenId);
          resetMintedCount();
          setKeplrState("loaded");
        })
        .catch((e) => {
          if (e.message === "Request rejected") {
            log.debug("Request rejected, reloading");
            setKeplrState("loaded");
          } else {
            log.error(e);
            setKeplrState("error");
            setTimeout(5000, () => setKeplrState("loaded"));
          }
        });
    } catch (e) {
      setKeplrState("error");
      setTimeout(5000, () => setKeplrState("loaded"));
    }
  };
  return (
    <button
      className="mintButton"
      aria-busy={buttonState.loading}
      disabled={buttonState.disabled}
      onClick={Mint}
    >
      {buttonState.label}
    </button>
  );
}

export default MintButton;
