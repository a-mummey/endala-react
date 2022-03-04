import { atom, atomFamily, selector } from "recoil";
import asyncNftHelper from "./utils/AsyncNftHelper";

const keplrState = atomFamily({
  key: "keplrState",
  default: {
    state: "loading",
    tokenId: null,
  },
});

const userAccountState = atom({
  key: "userAccountState",
  default: null,
});

const mintedCountState = atom({
  key: "mintedCountState",
  default: "?",
});

const raritiesState = atom({
  key: "raritiesState",
  default: [],
});

const mintedTokenInfo = selector({
  key: "mintedTokenInfo",
  get: async ({ get }) => {
    const helper = await asyncNftHelper();
    const latestTokenId = get(keplrState("tokenId"));

    if (typeof latestTokenId === "string") {
      const nftData = await helper.getNftData(latestTokenId);
      return nftData;
    } else {
      return null;
    }
  },
});

export {
  keplrState,
  mintedCountState,
  mintedTokenInfo,
  raritiesState,
  userAccountState,
};
