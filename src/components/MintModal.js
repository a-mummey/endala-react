import { Link } from "react-router-dom";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { mintedTokenInfo, newTokenAddedSelector } from "../state";
import "./MintModal.css";

function MintModal() {
  const setTokenId = useSetRecoilState(newTokenAddedSelector);

  const loadableNftData = useRecoilValueLoadable(mintedTokenInfo);
  const nftData = loadableNftData.valueMaybe();

  const CloseModalLink = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    setTokenId(null);
  };

  const CloseModal = () => setTokenId(null);

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
                onClick={CloseModalLink}
              >
                <i aria-hidden="true"></i>
              </a>
              <hgroup>
                <h3>{`${nftData.meta.name}`}</h3>
                <h4>
                  {`Rank: ${nftData.rarity.rank} / ${nftData.total}`}
                  {" • "}
                  <Link to={`/nft/${nftData.tokenId}`} onClick={CloseModal}>
                    View Details
                  </Link>
                </h4>
              </hgroup>
            </header>
            <Link to={`/nft/${nftData.tokenId}`} onClick={CloseModal}>
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
