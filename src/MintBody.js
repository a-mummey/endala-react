import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import "./MintBody.css";
import { lastMintedTokenIdState, mintedTokenInfo } from "./state";

function MintBody() {
  let nftData;
  const setTokenId = useSetRecoilState(lastMintedTokenIdState);

  const loadableNftData = useRecoilValueLoadable(mintedTokenInfo);
  // log.debug(loadableNftData);
  if (loadableNftData.state === "hasValue") {
    nftData = loadableNftData.contents;
  }
  const CloseModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    setTokenId(null);
  };

  if (nftData && nftData.meta) {
    return (
      <main className="container">
        <dialog className="minted-wrap" open>
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
              <h3>{`${nftData.meta.name}: Rank ${nftData.rarity.rank}/${nftData.total}`}</h3>
            </header>

            <img src={nftData.imageUrl} alt={nftData.meta.name} />
          </article>
        </dialog>
      </main>
    );
  } else {
    return <div></div>;
  }
}
export default MintBody;
