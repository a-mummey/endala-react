import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { addTestnetToKeplr } from "./KeplrTestnet";

const client = async (config) => {
  const prefix = "wasm";
  const gasPrice = null;

  // check browser compatibility
  if (!window.keplr) {
    throw new Error("Keplr is not supported or installed on this browser!");
  }

  // try to enable keplr with given chainId
  await window.keplr.enable(config.chainId).catch(() => {
    if (config.testnet) {
      // await addTestnetToKeplr().catch(() => {
      //   throw new Error(
      //     `Keplr can't connect to this chainId: ${config.chainId}`
      //   );
      // });
    } else {
      throw new Error(`Keplr can't connect to this chainId: ${config.chainId}`);
    }
  });

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
};

export default client;
