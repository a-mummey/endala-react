import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { mintedTokenInfo, keplrState } from "./state";
import "./MintBody.css";

function MintBody() {
  let nftData;
  const setTokenId = useSetRecoilState(keplrState("tokenId"));
  const loadable = useRecoilValueLoadable(mintedTokenInfo);
  if (loadable.state == "hasValue") {
    nftData = loadable.contents;
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
              ></a>
              <h3>{`${nftData.meta.name}: Rank ${nftData.rarity.rank}/${nftData.total}`}</h3>
            </header>

            <img src={nftData.imageUrl} />
          </article>
        </dialog>
      </main>
    );
  } else {
    return <div></div>;
  }
}
export default MintBody;
