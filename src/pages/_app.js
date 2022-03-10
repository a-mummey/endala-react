import { RecoilRoot } from "recoil";
import KeplrErrorModal from "../components/KeplrErrorModal";
import Footer from "../components/Footer";
import StateSubscriber from "../components/StateSubscriber";
import config from "../config";
import log from "loglevel";
import Nav from "../components/Nav";
import "../index.scss";

const MyApp = ({ Component, pageProps }) => {
  if (config.debug) log.setLevel("debug");
  return (
    <RecoilRoot>
      <Nav></Nav>
      <Component {...pageProps}></Component>
      <StateSubscriber></StateSubscriber>
      <Footer></Footer>
      <KeplrErrorModal></KeplrErrorModal>
    </RecoilRoot>
  );
};
export default MyApp;
