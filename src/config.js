import configBase from "./config-base";

const c = configBase.global.testnet
  ? configBase.testnet
  : configBase.production;
const config = { ...configBase.global, ...c };
Object.freeze(config);

export default config;
