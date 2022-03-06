import {
  currentAccountSelector,
  allMintedTokensState,
  myMintedTokensState,
} from "../state";
import { useRecoilValueLoadable, useRecoilCallback } from "recoil";
import { useEffect } from "react";
import asyncNftHelper from "../utils/AsyncNftHelper";

function StateSubscriber() {
  // I had trouble doing this without a separate compontent
  // Need to watch the accountId from Keplr
  const currentAccount = useRecoilValueLoadable(currentAccountSelector);

  const setAllTokens = useRecoilCallback(({ set }) => (tokenIds) => {
    if (tokenIds.length) {
      set(allMintedTokensState, (current) => [
        ...new Set([...current, ...tokenIds]),
      ]);
    }
  });
  const setMyTokens = useRecoilCallback(({ set }) => (tokenIds) => {
    if (tokenIds.length) {
      set(myMintedTokensState, (current) => [
        ...new Set([...current, ...tokenIds]),
      ]);
    }
  });
  // Once it is available, we'll pagniate through some of the APIs, updating loaded state as it comes
  useEffect(() => {
    if (currentAccount.valueMaybe()) {
      const loadAllMyTokens = async () => {
        const helper = await asyncNftHelper();
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

      const loadAllTokens = async () => {
        const helper = await asyncNftHelper();
        const accountId = currentAccount.valueOrThrow();
        let allTokensStartAfter = null;
        let allTokens = [];

        do {
          allTokens = await helper.getAllMintedTokens(allTokensStartAfter);
          allTokensStartAfter = allTokens[allTokens.length - 1];
          setAllTokens(allTokens);
        } while (allTokens.length >= helper.limit);
      };
      loadAllMyTokens();
      loadAllTokens();
    } else {
      return [];
    }
  });

  return <></>;
}

export default StateSubscriber;
