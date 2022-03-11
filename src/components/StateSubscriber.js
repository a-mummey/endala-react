import {
  currentAccountSelector,
  allMintedTokensState,
  allMintedTokensLoadingState,
  myMintedTokensState,
  myMintedTokensLoadingState,
  keplrDerviedState,
} from "../state";
import {
  useRecoilValueLoadable,
  useRecoilCallback,
  useRecoilValue,
} from "recoil";
import { useEffect } from "react";
import AsyncNftHelper from "../utils/AsyncNftHelper";

function StateSubscriber() {
  // I had trouble doing this without a separate compontent
  // Need to watch the accountId from Keplr
  const currentAccount = useRecoilValueLoadable(currentAccountSelector);
  const areMyTokensLoading = useRecoilValue(myMintedTokensLoadingState);
  const areAllTokensLoading = useRecoilValue(allMintedTokensLoadingState);

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

  const setAllTokensLoading = useRecoilCallback(({ set }) => (isLoading) => {
    set(allMintedTokensLoadingState, isLoading);
  });
  const setMyTokensLoading = useRecoilCallback(({ set }) => (isLoading) => {
    set(myMintedTokensLoadingState, isLoading);
  });
  // Once it is available, we'll pagniate through some of the APIs, updating loaded state as it comes
  useEffect(() => {
    const loadAllMyTokens = async () => {
      const helper = await AsyncNftHelper.getInstance();
      setMyTokensLoading(true);
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
      // setMyTokensLoading(false);
    };

    if (!areMyTokensLoading && currentAccount.valueMaybe()) {
      loadAllMyTokens();
      window.addEventListener("keplr_keystorechange", resetKeplr);
    }

    const loadAllTokens = async (helper, startAfter) => {
      const allTokens = await helper.getAllMintedTokens(startAfter);
      setAllTokens(allTokens);
      if (allTokens.length >= helper.limit) {
        loadAllTokens(helper, allTokens[allTokens.length - 1]);
      } else {
        return;
      }
    };

    const doAllTokenLoading = async () => {
      const helper = await AsyncNftHelper.getInstance();
      if (helper) {
        setAllTokensLoading(true);
        loadAllTokens(helper);
      }
    };
    if (!areAllTokensLoading) {
      doAllTokenLoading();
    }
  });

  return <></>;
}

export default StateSubscriber;
