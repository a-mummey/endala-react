import { useRecoilValueLoadable, useResetRecoilState } from "recoil";
import { keplrDerviedState } from "../state";

function KeplrErrorModal() {
  const kState = useRecoilValueLoadable(keplrDerviedState);
  const isKeplrError =
    kState.state === "hasValue" && kState.contents === "error";
  const resetKeplrState = useResetRecoilState(keplrDerviedState);

  const CloseModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    resetKeplrState();
  };

  if (isKeplrError) {
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
