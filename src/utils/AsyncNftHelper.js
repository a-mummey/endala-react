import config from "../config";
import AsyncKeplrClient from "./AsyncKeplrClient";
import NftHelper from "./NftHelper";

class AsyncNftHelper {
  static instance;
  static semaphore;
  static async getInstance() {
    if (!AsyncNftHelper.instance && !AsyncNftHelper.semaphore) {
      AsyncNftHelper.semaphore = true;
      const keplrClient = await AsyncKeplrClient.getInstance();
      AsyncNftHelper.instance = new NftHelper(keplrClient, config);
      return AsyncNftHelper.instance;
    } else {
      return AsyncNftHelper.instance;
    }
  }
}

export default AsyncNftHelper;
