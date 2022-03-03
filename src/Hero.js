import { useRecoilValue } from "recoil";
import config from "./config";
import "./Hero.css";
import MintButton from "./MintButton";
import ProgressBar from "./ProgressBar";
import { keplrState } from "./state";
import TestInstructions from "./TestInstructions";

function ShowMint(props) {
  const keplrValue = useRecoilValue(keplrState("state"));
  if (keplrValue == "not_exists") {
    return <h3>Please install Keplr extension</h3>;
  } else {
    return <MintButton></MintButton>;
  }
}

function Hero() {
  const testMessage = config.testnet ? (
    <TestInstructions></TestInstructions>
  ) : (
    ""
  );

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
        <ProgressBar></ProgressBar>
        <article>{testMessage}</article>
      </header>
    </div>
  );
}

export default Hero;
