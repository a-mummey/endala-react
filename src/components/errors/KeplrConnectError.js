function KeplrConnectError({ closeFunc }) {
  return (
    <dialog className="keplrError" open>
      <article>
        <header>
          <a
            href="#close"
            aria-label="Close"
            className="close"
            onClick={closeFunc}
          >
            <i aria-hidden="true"></i>
          </a>
          <h3>Could not connect with Keplr Wallet</h3>
        </header>
        <p>
          Keplr Wallet is required for some of the functionality on this site.
          You may still browse around, but the experience may be limited. Please
          try one of the following options to enable all functionality:
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
            If you have Keplr wallet installed and available, please try closing
            this modal and the site will attempt to detect it again.
          </li>
        </ul>
      </article>
    </dialog>
  );
}

export default KeplrConnectError;
