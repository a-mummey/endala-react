import { useRecoilValue } from "recoil";
import "./Hero.css";
import MintButton from "./MintButton";
import ProgressBar from "./ProgressBar";
import { keplrState } from "./state";
import config from "./config";

function ShowMint(props) {
  const keplrValue = useRecoilValue(keplrState("state"));
  if (keplrValue == "not_exists") {
    return <h3>Please install Keplr extension</h3>;
  } else {
    return <MintButton></MintButton>;
  }
}

function Hero() {
  const randInt = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
  const heroStyle = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9)), url("${config.fileBase}hero/hero${randInt}.jpg"`;
  console.log(heroStyle);
  return (
    <div
      className="hero"
      data-theme="dark"
      style={{ backgroundImage: heroStyle }}
    >
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
      </header>
    </div>
  );
}

export default Hero;
