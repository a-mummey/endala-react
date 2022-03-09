import {
  SigningCosmWasmClient,
  CosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import { addTestnetToKeplr } from "./KeplrTestnet";

class KeplrClient {
  config;
  client;

  constructor(config) {
    this.config = config;
  }

  loadClient = async () => {
    this.client = null;
    const prefix = "wasm";
    const gasPrice = null;
    const config = this.config;

    // hack foo to wait for keplr to be available
    await new Promise((r) => setTimeout(r, 1000));

    // check browser compatibility

    const checkChainOrTestnet = async () => {
      if (config.testnet) {
        const testnet = await addTestnetToKeplr();
      } else {
        const chain = await window.keplr.enable(config.chainId);
      }
    };

    await checkChainOrTestnet();
    const readOnlyClient = await CosmWasmClient.connect(config.rpcEndpoint);
    if (window.getOfflineSignerAuto) {
      // Setup signer
      const offlineSigner = await window.getOfflineSignerAuto(config.chainId);

      // Init SigningCosmWasmClient client
      const signingClient = await SigningCosmWasmClient.connectWithSigner(
        config.rpcEndpoint,
        offlineSigner,
        {
          prefix,
          gasPrice,
        }
      );
      this.client = { signingClient, offlineSigner, readOnlyClient };
    } else {
      this.client = { readOnlyClient };
    }
  };
}

export default KeplrClient;
