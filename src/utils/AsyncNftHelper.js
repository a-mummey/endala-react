import config from "../config";
import asyncKeplrClient from "./AsyncKeplrClient";
import NftHelper from "./NftHelper";

const asyncNftHelper = async () => {
  const client = await asyncKeplrClient;
  return new NftHelper(client, config);
};
export default asyncNftHelper;
