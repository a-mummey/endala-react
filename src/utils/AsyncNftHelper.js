import config from "../config";
import asyncKeplrClient from "./AsyncKeplrClient";
import NftHelper from "./NftHelper";

const asyncNftHelper = async () => {
  await asyncKeplrClient.loadClient();
  return new NftHelper(asyncKeplrClient.client, config);
};
export default asyncNftHelper;
