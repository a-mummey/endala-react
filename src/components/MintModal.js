import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import "./MintModal.css";
import { newTokenAddedSelector, mintedTokenInfo } from "../state";
import { Link } from "react-router-dom";

function MintModal() {
  const setTokenId = useSetRecoilState(newTokenAddedSelector);

  const loadableNftData = useRecoilValueLoadable(mintedTokenInfo);
  const nftData = loadableNftData.valueMaybe();

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
              <hgroup>
                <h3>{`${nftData.meta.name}: Rank ${nftData.rarity.rank}/${nftData.total}`}</h3>
                <h4>
                  <Link to={`/my-endalas/${nftData.tokenId}`}>
                    View In Gallery
                  </Link>
                </h4>
              </hgroup>
            </header>
            <Link to={`/my-endalas/${nftData.tokenId}`}>
              <img src={nftData.imageUrl} alt={nftData.meta.name} />
            </Link>
          </article>
        </dialog>
      </main>
    );
  } else {
    return <div></div>;
  }
}
export default MintModal;
