import { calculateFee, coins, GasPrice } from "@cosmjs/stargate";
import log from "loglevel";

class NftHelper {
  config;
  client;
  constructor(client, config) {
    this.offlineSigner = client.offlineSigner;
    this.client = client.signingClient;
    this.config = config;
  }

  getAllRarities = async () => {
    const r = await window.fetch(
      `${this.config.fileUrlRarities}/rarities${this.config.rarityType}`
    );
    return await r.json();
  };

  getNftData = async (tokenId) => {
    const rarityP = await window.fetch(
      `${this.config.fileUrlRarities}/${tokenId}${this.config.rarityType}`
    );
    const metaP = await window.fetch(
      `${this.config.fileUrlMetadata}/${tokenId}${this.config.metadataType}`
    );

    const rarity = await rarityP.json();
    const meta = await metaP.json();

    return {
      tokenId,
      imageUrl: `${this.config.fileUrlThumbnails}/${tokenId}${this.config.thumbFiletype}`,
      rarity,
      meta,
      total: this.config.totalNumMints,
    };
  };

  getMyTokens = async (accountId) => {
    const limit = 30;
    const baseQuery = {
      tokens: {
        owner: accountId,
        limit: limit,
      },
    };
    let maxPages = 100;
    let pageNum = 0;
    let keepPaging = false;
    let q = { ...baseQuery };
    const myTokens = [];
    do {
      const { tokens } = await this.client.queryContractSmart(
        this.config.sg721,
        q
      );
      myTokens.push(...tokens);
      if (tokens.length >= limit) {
        keepPaging = true;
        q = { tokens: { ...q.tokens, start_after: [...tokens].pop() } };
      } else {
        keepPaging = false;
      }
      pageNum++;
    } while (keepPaging && pageNum < maxPages);
    return new Set(myTokens);
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
