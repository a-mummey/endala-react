import log from "loglevel";
import { atom, DefaultValue, selector, selectorFamily } from "recoil";
import config from "./config";
import AsyncKeplrClient from "./utils/AsyncKeplrClient";
import NftHelper from "./utils/NftHelper";

// This keeps the current client and its status
const keplrClientState = atom({
  key: "keplrClientState",
  default: {
    client: null,
    offlineSigner: null,
    readOnlyClient: null,
    state: "loading",
  },
  effects: [
    async ({ setSelf, onSet }) => {
      const initialize = async () => {
        try {
          const { client, offlineSigner, readOnlyClient } =
            await AsyncKeplrClient.getInstance();
          setSelf({
            client,
            offlineSigner,
            readOnlyClient,
            state: "loaded",
          });
        } catch (e) {
          setSelf({ client: null, readOnlyClient: null, state: "error" });
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

const mintErrorDetails = atom({
  key: "mintErrorDetails",
  default: null,
});

// Total number of mints
const mintedCountState = atom({
  key: "mintedCountState",
  default: "?",
  effects: [
    async ({ setSelf, onSet, get }) => {
      const initialize = async () => {
        try {
          const { readOnlyClient } = get(keplrClientState);
          if (readOnlyClient) {
            const helper = new NftHelper({ readOnlyClient }, config);
            helper.getProgress().then((progress) => {
              setSelf(progress.minted);
            });
          }
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
    async ({ setSelf, get }) => {
      const { readOnlyClient } = get(keplrClientState);
      if (readOnlyClient) {
        const helper = new NftHelper({ readOnlyClient }, config);
        const rarities = await helper.getAllRarities();
        setSelf(rarities);
      }
    },
  ],
});

// Get details of a single NFT
const nftDetailsSelector = selectorFamily({
  key: "singleRaritySelector",
  get:
    (tokenId) =>
    async ({ get }) => {
      if (tokenId) {
        const { readOnlyClient } = get(keplrClientState);
        if (readOnlyClient) {
          const helper = new NftHelper({ readOnlyClient }, config);
          const nftData = await helper.getNftData(tokenId);
          return nftData;
        }
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

const sortedMintedTokensSelector = selector({
  key: "sortedMintedTokensSelector",
  get: ({ get }) => {
    const allTokens = get(allMintedTokensState);
    if (allTokens) {
      return [...allTokens].sort((a, b) => parseInt(a) - parseInt(b));
    }
  },
});

// The last minted token information
const mintedTokenInfo = selector({
  key: "mintedTokenInfo",
  get: async ({ get }) => {
    const { readOnlyClient } = get(keplrClientState);
    if (readOnlyClient) {
      const helper = new NftHelper({ readOnlyClient }, config);
      const latestTokenId = get(lastMintedTokenIdState);

      if (latestTokenId) {
        const nftData = await helper.getNftData(latestTokenId);
        return nftData;
      } else {
        return null;
      }
    }
  },
});

// My STARS account id
const currentAccountSelector = selector({
  key: "currentAccountSelector",
  get: async ({ get }) => {
    const kState = get(keplrDerviedState);
    if (kState === "loaded") {
      const { offlineSigner } = await AsyncKeplrClient.getInstance();
      const accounts = await offlineSigner.getAccounts();
      if (Array.isArray(accounts) && accounts[0]) {
        return accounts[0].address;
      } else {
        return null;
      }
    }
  },
});

const tokenInfoSelector = selectorFamily({
  key: "tokenInfoSelector",
  get:
    (tokenId) =>
    async ({ get }) => {
      const { readOnlyClient } = get(keplrClientState);
      console.log("readOnlyClient", readOnlyClient);
      if (readOnlyClient) {
        const helper = new NftHelper({ readOnlyClient }, config);
        try {
          const response = await helper.getTokenInfo(tokenId);
          console.log("response", response);
          return response;
        } catch (e) {
          console.log(e);
        }
      }
    },
});

const myMintedTokensState = atom({
  key: "myMintedTokensState",
  default: [],
});

const myMintedTokensLoadingState = atom({
  key: "myMintedTokensLoadingState",
  default: false,
});

const allMintedTokensState = atom({
  key: "allMintedTokensState",
  default: null,
});

const allMintedTokensLoadingState = atom({
  key: "allMintedTokensLoadingState",
  default: false,
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
  mintErrorDetails,
  sortedMintedTokensSelector,
  myMintedTokensLoadingState,
  allMintedTokensLoadingState,
  tokenInfoSelector,
};
