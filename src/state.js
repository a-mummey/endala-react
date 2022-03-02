import { atom, selector } from "recoil";

const keplrState = atom({
  key: "keplrState",
  default: "loading",
});

const keplrMessageState = selector({
  key: "keplrMessage",
  get: ({ get }) => {
    const kstate = get(keplrState);

    switch (kstate) {
      case "loading":
        return "Loading";
      default:
        return "Loading";
    }
  },
});

export { keplrMessageState, keplrState };
