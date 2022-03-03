import { atom, useSetRecoilState } from "recoil";

import asyncNftHelper from "./utils/AsyncNftHelper";

const keplrState = atom({
  key: "keplrState",
  default: "loading",
  effects: [
    ({ onSet, setSelf }) => {
      onSet(async (state, oldState) => {
        switch (`${oldState}-${state}`) {
          case "loaded-minting":
            // Mint
            const nftHelper = await asyncNftHelper();
            nftHelper
              .mintSender()
              .then((tokenId) => {
                // setTokenId(tokenId);
                setSelf("loaded");
              })
              .catch((e) => {
                if (e.message === "Request rejected") {
                  console.debug("Request rejected, reloading");
                  setSelf("loaded");
                } else {
                  console.error(e);
                  setSelf("error");
                }
              });
            console.log(nftHelper);
            break;
          default:
            //Do nothign
            break;
        }
      });
    },
  ],
});

const latestMintedToken = atom({
  key: "latestMintedToken",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet(async (state, oldState) => {
        console.log(state, oldState);
      });
    },
  ],
});

const mintedCountState = atom({
  key: "mintedCountState",
  default: "?",
});

export { keplrState, mintedCountState };
