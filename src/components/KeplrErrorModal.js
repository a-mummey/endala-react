import {
  useRecoilValueLoadable,
  useResetRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { keplrDerviedState, keplrErrorMsgViewed } from "../state";

function KeplrErrorModal() {
  const kState = useRecoilValueLoadable(keplrDerviedState);
  const isKeplrError = kState.valueMaybe() === "error";
  const resetKeplrState = useResetRecoilState(keplrDerviedState);
  const viewedKeplrMessage = useRecoilValue(keplrErrorMsgViewed);
  const setViewedKeplrMessage = useSetRecoilState(keplrErrorMsgViewed);

  const CloseModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    resetKeplrState();
    setViewedKeplrMessage(true);
  };

  if (isKeplrError && !viewedKeplrMessage) {
    return (
      <dialog className="keplrError" open>
        <article>
          <header>
            <a
              href="#close"
              aria-label="Close"
              className="close"
              onClick={CloseModal}
            >
              <i aria-hidden="true"></i>
            </a>
            <h3>Could not connect with Keplr Wallet</h3>
          </header>
          <p>
            Keplr Wallet is required for the proper functioning of this website.
            Please try one of the following options:
          </p>
          <hr></hr>
          <ul>
            <li>
              Install Keplr Wallet at{" "}
              <a href={"http://keplr.app"} target={"_blank"} rel="noreferrer">
                http://keplr.app
              </a>
            </li>
            <li>
              If you have Keplr wallet installed and available, please try
              closing this modal and the site will attempt to detect it again.
            </li>
          </ul>
        </article>
      </dialog>
    );
  } else {
    return <></>;
  }
}

export default KeplrErrorModal;
