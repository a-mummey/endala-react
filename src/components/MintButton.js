import log from "loglevel";
import React from "react";
import {
  useRecoilValueLoadable,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import styles from "./MintButton.module.scss";
import {
  keplrDerviedState,
  newTokenAddedSelector,
  mintedCountState,
  mintErrorDetails,
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
  mint_error: {
    label: "Mint Error",
    disabled: true,
    loading: false,
  },
};

function MintButton() {
  const resetMintedCount = useResetRecoilState(mintedCountState);
  const kState = useRecoilValueLoadable(keplrDerviedState);
  const setKeplrState = useSetRecoilState(keplrDerviedState);
  const setNewToken = useSetRecoilState(newTokenAddedSelector);
  const setMintErrorDetails = useSetRecoilState(mintErrorDetails);

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
            setKeplrState("mint_error");
            setMintErrorDetails(e.message);
          }
        });
    } catch (e) {
      setKeplrState("mint_error");
      setMintErrorDetails(e.message);
    }
  };
  return (
    <button
      className={styles.mintButton}
      aria-busy={buttonState.loading}
      disabled={buttonState.disabled}
      onClick={Mint}
    >
      {buttonState.label}
    </button>
  );
}

export default MintButton;
