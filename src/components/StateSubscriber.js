import {
  currentAccountSelector,
  allMintedTokensState,
  myMintedTokensState,
  keplrDerviedState,
} from "../state";
import { useRecoilValueLoadable, useRecoilCallback } from "recoil";
import { useEffect } from "react";
import AsyncNftHelper from "../utils/AsyncNftHelper";

function StateSubscriber() {
  // I had trouble doing this without a separate compontent
  // Need to watch the accountId from Keplr
  const currentAccount = useRecoilValueLoadable(currentAccountSelector);

  const setAllTokens = useRecoilCallback(({ set }) => (tokenIds) => {
    if (tokenIds.length) {
      set(allMintedTokensState, (current) => {
        const minted = current || [];
        return [...new Set([...minted, ...tokenIds])];
      });
    }
  });
  const setMyTokens = useRecoilCallback(({ set }) => (tokenIds) => {
    if (tokenIds.length) {
      set(myMintedTokensState, (current) => [
        ...new Set([...current, ...tokenIds]),
      ]);
    }
  });
  const resetKeplr = useRecoilCallback(({ reset }) => (tokenIds) => {
    reset(keplrDerviedState);
  });
  // Once it is available, we'll pagniate through some of the APIs, updating loaded state as it comes
  useEffect(() => {
    if (currentAccount.valueMaybe()) {
      const loadAllMyTokens = async () => {
        const helper = await AsyncNftHelper.getInstance();
        const accountId = currentAccount.valueOrThrow();
        let myTokensStartAfter = null;
        let myTokens = [];
        do {
          myTokens = await helper.getMyMintedTokens(
            accountId,
            myTokensStartAfter
          );
          myTokensStartAfter = myTokens[myTokens.length - 1];
          setMyTokens(myTokens);
        } while (myTokens.length >= helper.limit);
      };
      loadAllMyTokens();
      window.addEventListener("keplr_keystorechange", resetKeplr);
    }

    const loadAllTokens = async () => {
      const helper = await AsyncNftHelper.getInstance();

      let allTokensStartAfter = null;
      let allTokens = [];

      do {
        allTokens = await helper.getAllMintedTokens(allTokensStartAfter);
        allTokensStartAfter = allTokens[allTokens.length - 1];
        setAllTokens(allTokens);
      } while (allTokens.length >= helper.limit);
    };

    loadAllTokens();
  });

  return <></>;
}

export default StateSubscriber;
