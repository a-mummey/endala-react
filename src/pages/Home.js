import Hero from "../Hero";
import MintModal from "../MintModal";
import TestMessage from "../TestMessage";
import KeplrErrorModal from "../KeplrErrorModal";

function Home() {
  return (
    <>
      <Hero></Hero>
      <TestMessage></TestMessage>
      <MintModal></MintModal>
      <KeplrErrorModal></KeplrErrorModal>
    </>
  );
}
export default Home;
