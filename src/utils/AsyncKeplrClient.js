import config from "../config";
import KeplrClient from "./KeplrClient";

class AsyncKeplrClient {
  static instance;
  static async getInstance() {
    if (AsyncKeplrClient.instance) {
      return AsyncKeplrClient.instance;
    } else {
      AsyncKeplrClient.instance = KeplrClient(config);
      return AsyncKeplrClient.instance;
    }
  }
}

export default AsyncKeplrClient;
