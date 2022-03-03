import config from "../config";
import keplrClient from "./KeplrClient";

const asyncKeplrClient = keplrClient(config);
export default asyncKeplrClient;
