import config from "../config";
import "./Hero.css";
import MintButton from "./MintButton";
import ProgressBar from "./ProgressBar";

function Hero() {
  const randInt =
    Math.floor(Math.random() * (config.numHeroImages - 1 + 1)) + 1;
  const heroStyle = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9)), url("${config.fileBase}hero/hero${randInt}.jpg"`;

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
            <h2>A Generative NFT Project on Stargaze</h2>
          </hgroup>
          <p>
            <MintButton></MintButton>
          </p>
        </div>
        <ProgressBar></ProgressBar>
      </header>
    </div>
  );
}

export default Hero;
