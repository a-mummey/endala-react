import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { addTestnetToKeplr } from "./KeplrTestnet";

const client = async (config) => {
  const prefix = "wasm";
  const gasPrice = null;

  // hack foo to wait for keplr to be available
  await new Promise((r) => setTimeout(r, 200));

  // check browser compatibility

  const checkChainOrTestnet = async () => {
    if (config.testnet) {
      const testnet = await addTestnetToKeplr();
    } else {
      const chain = await window.keplr.enable(config.chainId);
    }
  };

  await checkChainOrTestnet();

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
    return signingClient;
  } else {
    throw Error("Keplr not available");
  }
};

export default client;
