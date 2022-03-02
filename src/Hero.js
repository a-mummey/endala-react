import "./Hero.css";
import MintButton from "./MintButton";
import { useRecoilValue } from "recoil";
import { keplrState } from "./state";

function ShowMint(props) {
  const keplrValue = useRecoilValue(keplrState);
  if (keplrValue == "not_exists") {
    return <h3>Please install Keplr extension</h3>;
  } else {
    return <MintButton></MintButton>;
  }
}

function Hero() {
  return (
    <div className="hero" data-theme="dark">
      <header className="container">
        <div>
          <hgroup>
            <h1>Endala</h1>
            <h2>A Stargaze NFT Project</h2>
          </hgroup>
          <p>
            <ShowMint></ShowMint>
          </p>
        </div>
        <div id="mint-progress-wrap" className="container">
          <div className="progress-header">
            Endalas Minted:
            <span id="mint-progress-count"></span>/
            <span id="mint-progress-total"></span>
            <progress id="mint-progress-bar" value="" max=""></progress>
          </div>
        </div>
        <p>
          For testnet, please accept the Keplr request to add the testnet. Then
          ensure you fund your testnet wallet from the
          <a
            href="https://discord.com/channels/755548171941445642/940653213022031912"
            target="_blank"
          >
            faucet
          </a>
          .
        </p>
      </header>
    </div>
  );
}

export default Hero;
