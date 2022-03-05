import config from "../config";
import KeplrClient from "./KeplrClient";

const asyncKeplrClient = new KeplrClient(config);
export default asyncKeplrClient;
