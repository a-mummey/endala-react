import Hero from "../components/Hero";
import MintModal from "../components/MintModal";
import TestMessage from "../components/TestMessage";
import KeplrErrorModal from "../components/KeplrErrorModal";

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
