import { useRecoilValue, useSetRecoilState } from "recoil";
import { mintErrorDetails } from "../../state";

function KeplrMintError({ closeFunc }) {
  const mintError = useRecoilValue(mintErrorDetails) || "";
  const setMintErrorDetails = useSetRecoilState(mintErrorDetails);

  const closeModal = async () => {
    setMintErrorDetails(null);
    closeFunc();
  };
  let errorMsg = (
    <>
      Unknown Error. Please try again.
      <code>{mintError}</code>
    </>
  );

  if (mintError.includes("Code: 5")) {
    errorMsg = "This address has exceeded the maximum amount of allowed mints.";
  } else if (mintError.includes("code 11") || mintError.includes("Code: 11")) {
    errorMsg =
      "There was not enough gas used to perform the mint. Please try increasing the gas and try again.";
  }
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
          <h3>There was a problem during mint</h3>
        </header>
        <p>{errorMsg}</p>
      </article>
    </dialog>
  );
}

export default KeplrMintError;
