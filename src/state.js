import log from "loglevel";
import { atom, DefaultValue, selector, selectorFamily } from "recoil";
import asyncKeplrClient from "./utils/AsyncKeplrClient";
import asyncNftHelper from "./utils/AsyncNftHelper";

// This keeps the current client and its status
const keplrClientState = atom({
  key: "keplrClientState",
  default: { client: null, state: "loading" },
  effects: [
    async ({ setSelf, onSet }) => {
      const initialize = async () => {
        try {
          await asyncKeplrClient.loadClient();
          setSelf({ client: asyncKeplrClient.client, state: "loaded" });
        } catch (e) {
          setSelf({ client: null, state: "error" });
        }
      };
      await initialize();
      onSet(async (n, o, isReset) => {
        if (isReset) {
          await initialize();
        }
      });
    },
  ],
});

// This is basically a helper to get/set the grouped state by key
const keplrClientSelectorFamily = selectorFamily({
  key: "keplrClientSelectorFamily",
  get:
    (key) =>
    ({ get }) => {
      return get(keplrClientState)[key];
    },
  set:
    (key) =>
    ({ set, get }, newValue) => {
      set(keplrClientState, (prevState) => ({ ...prevState, [key]: newValue }));
    },
});

const keplrErrorMsgViewed = atom({
  key: "keplrErrorMsgViewed",
  default: false,
});

// Simple minting flag
const mintingState = atom({
  key: "mintingState",
  default: false,
});

// Derived State of the Keplr Wallet
const keplrDerviedState = selector({
  key: "keplrState",
  get: async ({ get }) => {
    const clientState = await get(keplrClientSelectorFamily("state"));
    const minting = get(mintingState);
    if (clientState === "loading") {
      return "loading";
    } else if (minting) {
      return "minting";
    } else {
      return clientState;
    }
  },

  set: ({ set, get, reset }, newValue) => {
    if (newValue instanceof DefaultValue) {
      // Reset
      set(mintingState, false);
      reset(keplrClientState);
    } else {
      switch (newValue) {
        case "error":
          set(mintingState, false);
          set(keplrClientSelectorFamily("state"), "error");
          break;
        case "minting":
          set(mintingState, true);
          break;
        case "loaded":
          set(mintingState, false);
          set(keplrClientSelectorFamily("state"), "loaded");
          break;
        case "mint_error":
          set(mintingState, false);
          set(keplrClientSelectorFamily("state"), "mint_error");
          break;
        default:
          log.error(`Unknown state value: ${newValue}`);
        // Unsure
      }
    }
  },
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

// Get details of a single NFT
const nftDetailsSelector = selectorFamily({
  key: "singleRaritySelector",
  get: (tokenId) => async () => {
    if (tokenId) {
      const helper = await asyncNftHelper();
      const nftData = await helper.getNftData(tokenId);
      return nftData;
    }
  },
});

// Last minted token id
const lastMintedTokenIdState = atom({
  key: "lastMintedTokenIdState",
  default: null,
});

const newTokenAddedSelector = selector({
  key: "newTokenAddedSelector",
  get: ({ get }) => {
    return get(lastMintedTokenIdState);
  },
  set: ({ set, get }, tokenId) => {
    set(lastMintedTokenIdState, tokenId);
    if (tokenId) {
      set(myMintedTokensState, (current) => [
        ...new Set([...current, tokenId]),
      ]);
      set(allMintedTokensState, (current) => [
        ...new Set([...current, tokenId]),
      ]);
    }
  },
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
    const kState = get(keplrDerviedState);
    if (kState === "loaded") {
      const { client } = await asyncKeplrClient;
      const accounts = await client.offlineSigner.getAccounts();
      if (Array.isArray(accounts) && accounts[0]) {
        return accounts[0].address;
      } else {
        return null;
      }
    }
  },
});

const myMintedTokensState = atom({
  key: "myMintedTokensState",
  default: [],
});

const allMintedTokensState = atom({
  key: "allMintedTokensState",
  default: null,
});

export {
  keplrDerviedState,
  mintedCountState,
  mintedTokenInfo,
  raritiesState,
  currentAccountSelector,
  newTokenAddedSelector,
  nftDetailsSelector,
  allMintedTokensState,
  myMintedTokensState,
  keplrErrorMsgViewed,
};
