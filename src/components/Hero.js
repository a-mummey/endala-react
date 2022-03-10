import config from "../config";
import "./Hero.css";
import MintButton from "./MintButton";
import ProgressBar from "./ProgressBar";
import Countdown from "react-countdown";

function Hero() {
  const randInt =
    Math.floor(Math.random() * (config.numHeroImages - 1 + 1)) + 1;
  const heroStyle = `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6)), url("${config.fileBase}hero/hero${randInt}.jpg"`;

  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    formatted,
    completed,
  }) => {
    if (completed) {
      // Render a completed state
      return <MintButton></MintButton>;
    } else {
      const plural = (i) => (i === 1 ? "" : "s");
      const d = days ? `${days} day${plural(days)}` : "";
      const h = hours ? `${hours} hour${plural(hours)}` : "";
      const m = minutes ? `${minutes} minute${plural(minutes)}` : "";
      const s = seconds ? `${seconds} second${plural(seconds)}` : "";

      // Render a countdown
      return (
        <button className="secondary" disabled>
          {`${d} ${h} ${m} ${s}`}
        </button>
      );
    }
  };

  return (
    <div
      className="hero"
      data-theme="dark"
      style={{ backgroundImage: heroStyle }}
    >
      <header className="container">
        <div className="row">
          <div className="col-sm-6">
            <hgroup>
              <h1>Endala</h1>
              <h2>A Generative NFT Project on Stargaze</h2>
            </hgroup>
            <p>
              <Countdown
                renderer={renderer}
                date={"2022-03-11T21:00:00.000Z"}
              ></Countdown>
            </p>
            <ProgressBar></ProgressBar>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Hero;
