import { useRecoilValue } from "recoil";
import { userAccountState } from "../state";
import React, { useEffect } from "react";
import asyncNftHelper from "../utils/AsyncNftHelper";
import log from "loglevel";

function MyEndalas() {
  const accountId = useRecoilValue(userAccountState);
  let myTokens = [];

  useEffect(async () => {
    if (accountId) {
      const helper = await asyncNftHelper();
      myTokens = await helper.getMyTokens(accountId);
      log.debug(myTokens);
    }
  });

  return <div>MyEndalas</div>;
}

export default MyEndalas;
