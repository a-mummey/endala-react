import Link from "next/link";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { mintedTokenInfo, newTokenAddedSelector } from "../state";
import styles from "./MintModal.module.scss";

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
        <dialog className={styles.mintedWrap} open>
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
                  <Link href={`/nft/${nftData.tokenId}`} onClick={CloseModal}>
                    <a>View Details</a>
                  </Link>
                </h4>
              </hgroup>
            </header>
            <Link href={`/nft/${nftData.tokenId}`} onClick={CloseModal}>
              <a>
                <img src={nftData.imageUrl} alt={nftData.meta.name} />
              </a>
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
