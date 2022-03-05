import Hero from "../Hero";
import MintBody from "../MintBody";
import TestMessage from "../TestMessage";
import KeplrErrorModal from "../KeplrErrorModal";

function Home() {
  return (
    <>
      <Hero></Hero>
      <TestMessage></TestMessage>
      <MintBody></MintBody>
      <KeplrErrorModal></KeplrErrorModal>
    </>
  );
}
export default Home;
