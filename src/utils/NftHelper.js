import { calculateFee, coins, GasPrice } from "@cosmjs/stargate";
import log from "loglevel";
import { allRaritiesUrl, metaUrl, rarityUrl, thumbUrl } from "./UrlHelper";
import KeplrClient from "./KeplrClient";

class NftHelper {
  config;
  signingClient;
  readOnlyClient;
  limit = 30;
  constructor({ client, offlineSigner, readOnlyClient }, config) {
    // console.log(client);
    this.offlineSigner = offlineSigner;
    this.signingClient = client;
    this.readOnlyClient = readOnlyClient;
    this.config = config;
  }

  getAllRarities = async () => {
    const r = await window.fetch(allRaritiesUrl());
    return await r.json();
  };

  // Load files from AWS
  getNftData = async (tokenId) => {
    const rarityP = await window.fetch(rarityUrl(tokenId));
    const metaP = await window.fetch(metaUrl(tokenId));

    const rarity = await rarityP.json();
    const meta = await metaP.json();

    return {
      tokenId,
      imageUrl: thumbUrl(tokenId),
      rarity,
      meta,
      total: this.config.totalNumMints,
    };
  };

  // Get chain info
  getTokenInfo = async (tokenId) => {
    const tokenQuery = await this.readOnlyClient.queryContractSmart(
      this.config.sg721,
      {
        all_nft_info: { token_id: tokenId },
      }
    );
    console.log(tokenQuery);
    return tokenQuery;
  };

  // https://github.com/public-awesome/stargaze-contracts/blob/main/contracts/sg721/schema/query_msg.json
  getProgress = async () => {
    const tokenQuery = await this.readOnlyClient.queryContractSmart(
      this.config.sg721,
      {
        num_tokens: {},
      }
    );
    return {
      minted: tokenQuery.count,
      total: this.config.totalNumMints,
    };
  };

  getMyMintedTokens = async (accountId, startAfter) => {
    const q = {
      tokens: {
        owner: accountId,
        limit: this.limit,
      },
    };
    if (startAfter) {
      q.tokens.start_after = startAfter;
    }

    const { tokens } = await this.signingClient.queryContractSmart(
      this.config.sg721,
      q
    );

    return tokens;
  };

  getAllMintedTokens = async (startAfter) => {
    const q = {
      all_tokens: {
        limit: this.limit,
      },
    };
    if (startAfter) {
      q.all_tokens.start_after = startAfter;
    }
    // console.log("getAllMintedTokens", q);
    const { tokens } = await this.readOnlyClient.queryContractSmart(
      this.config.sg721,
      q
    );
    return tokens;
  };

  mintSender = async () => {
    const offlineSigner = window.getOfflineSigner(this.config.chainId);
    const accounts = await offlineSigner.getAccounts();

    const MINT_FEE = coins(this.config.mintPriceStars * 1000000, "ustars");

    const gasPrice = GasPrice.fromString("0ustars");
    const executeFee = calculateFee(300_000, gasPrice);

    const msg = { mint: {} };
    log.debug(msg);

    // This is pure hack, not sure why my other client isn't working.
    const { client } = await KeplrClient(this.config);
    const result = await client.execute(
      accounts[0].address,
      this.config.minter,
      msg,
      executeFee,
      "mint to sender",
      MINT_FEE
    );
    const wasmEvent = result.logs[0].events.find((e) => e.type === "wasm");
    const tokenId = wasmEvent.attributes.find((a) => a.key === "token_id");
    log.debug(`Minted token id:${tokenId.value}`);
    return tokenId.value;
  };
}

export default NftHelper;
