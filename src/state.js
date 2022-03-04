import { atom, selector } from "recoil";
import asyncKeplrClient from "./utils/AsyncKeplrClient";
import asyncNftHelper from "./utils/AsyncNftHelper";

// State of the Keplr Wallet
const keplrState = atom({
  key: "keplrState",
  default: "loading",
  effects: [
    async ({ setSelf }) => {
      try {
        const client = await asyncKeplrClient;
        setSelf("loaded");
      } catch (e) {
        setSelf("error");
      }
    },
  ],
});

// Total number of mints
const mintedCountState = atom({
  key: "mintedCountState",
  default: "?",
  effects: [
    async ({ setSelf, onSet }) => {
      const initialize = async () => {
        try {
          const helper = await asyncNftHelper();
          helper.getProgress().then((progress) => {
            setSelf(progress.minted);
          });
        } catch (e) {
          setSelf("?");
        }
      };
      onSet(async (n, o, isReset) => {
        if (isReset) {
          await initialize();
        }
      });
      await initialize();
    },
  ],
});

// Loads the list of rarities
const raritiesState = atom({
  key: "raritiesState",
  default: [],
  effects: [
    async ({ setSelf }) => {
      const helper = await asyncNftHelper();
      const rarities = await helper.getAllRarities();
      setSelf(rarities);
    },
  ],
});

// Last minted token id
const lastMintedTokenIdState = atom({
  key: "lastMintedTokenIdState",
  default: null,
});

// The last minted token information
const mintedTokenInfo = selector({
  key: "mintedTokenInfo",
  get: async ({ get }) => {
    const helper = await asyncNftHelper();
    const latestTokenId = get(lastMintedTokenIdState);

    if (latestTokenId) {
      const nftData = await helper.getNftData(latestTokenId);
      return nftData;
    } else {
      return null;
    }
  },
});

// My STARS account id
const currentAccountSelector = selector({
  key: "currentAccountSelector",
  get: async ({ get }) => {
    const kState = get(keplrState);
    if (kState == "loaded") {
      const client = await asyncKeplrClient;
      const accounts = await client.offlineSigner.getAccounts();
      if (Array.isArray(accounts) && accounts[0]) {
        return accounts[0].address;
      } else {
        return null;
      }
    }
  },
});

// A list of tokens I've minted
const myTokensSelector = selector({
  key: "myTokensSelector",
  get: async ({ get }) => {
    const currentAccount = get(currentAccountSelector);
    if (currentAccount) {
      const helper = await asyncNftHelper();
      const tokenSet = await helper.getMyTokens(currentAccount);
      return [...tokenSet];
    } else {
      return [];
    }
  },
});

export {
  keplrState,
  mintedCountState,
  mintedTokenInfo,
  raritiesState,
  currentAccountSelector,
  myTokensSelector,
  lastMintedTokenIdState,
};
