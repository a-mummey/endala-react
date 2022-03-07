import { calculateFee, coins, GasPrice } from "@cosmjs/stargate";
import log from "loglevel";
import { allRaritiesUrl, metaUrl, rarityUrl, thumbUrl } from "./UrlHelper";

class NftHelper {
  config;
  client;
  limit = 30;
  constructor(client, config) {
    this.offlineSigner = client.offlineSigner;
    this.client = client.signingClient;
    this.config = config;
  }

  getAllRarities = async () => {
    const r = await window.fetch(allRaritiesUrl());
    return await r.json();
  };

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

  // https://github.com/public-awesome/stargaze-contracts/blob/main/contracts/sg721/schema/query_msg.json
  getProgress = async () => {
    const tokenQuery = await this.client.queryContractSmart(this.config.sg721, {
      num_tokens: {},
    });
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
    // console.log("getMyMintedTokens", q);
    const { tokens } = await this.client.queryContractSmart(
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
    const { tokens } = await this.client.queryContractSmart(
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

    const result = await this.client.execute(
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
