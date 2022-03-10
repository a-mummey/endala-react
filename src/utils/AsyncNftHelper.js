import config from "../config";
import AsyncKeplrClient from "./AsyncKeplrClient";
import NftHelper from "./NftHelper";

class AsyncNftHelper {
  static instance;
  static async getInstance() {
    if (AsyncNftHelper.instance) {
      return AsyncNftHelper.instance;
    } else {
      AsyncNftHelper.instance = AsyncKeplrClient.getInstance().then(
        (keplrClient) => {
          return new NftHelper(keplrClient, config);
        }
      );
      return AsyncKeplrClient.instance;
    }
  }
}

export default AsyncNftHelper;
