import {
  SigningCosmWasmClient,
  CosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import { addTestnetToKeplr } from "./KeplrTestnet";

const KeplrClient = async (config) => {
  const prefix = "wasm";
  const gasPrice = null;

  // hack foo to wait for keplr to be available
  await new Promise((r) => setTimeout(r, 1000));

  // check browser compatibility

  const checkChainOrTestnet = async () => {
    if (config.testnet) {
      const testnet = await addTestnetToKeplr();
    } else {
      console.log("connecting");
      const chain = await window.keplr.enable(config.chainId);
    }
  };

  await checkChainOrTestnet();
  const readOnlyClient = await CosmWasmClient.connect(config.rpcEndpoint);
  if (window.getOfflineSignerAuto) {
    // Setup signer
    const offlineSigner = await window.getOfflineSignerAuto(config.chainId);

    // Init SigningCosmWasmClient client
    const client = await SigningCosmWasmClient.connectWithSigner(
      config.rpcEndpoint,
      offlineSigner,
      {
        prefix,
        gasPrice,
      }
    );
    return { client, offlineSigner, readOnlyClient };
  } else {
    return { readOnlyClient };
  }
};

export default KeplrClient;
