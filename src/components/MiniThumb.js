import Link from "next/link";
import { useRecoilValueLoadable } from "recoil";
import { myMintedTokensState } from "../state";
import { miniUrl } from "../utils/UrlHelper";
import styles from "./MiniThumb.module.scss";

function MiniThumb({ tokenId }) {
  const myMintedTokens = useRecoilValueLoadable(myMintedTokensState);
  const isMyMint = (myMintedTokens.valueMaybe() || []).includes(tokenId);
  const myMintIdentifier = isMyMint ? (
    <strong title="You minted this Endala">⦿</strong>
  ) : (
    <></>
  );
  return (
    <div className={`${styles.miniThumb} col-sm-6 col-md-4 col-lg-3 col-xl-2`}>
      <figure>
        <Link href={`/nft/${tokenId}`} className="miniThumb">
          <a>
            <img src={miniUrl(tokenId)} />
          </a>
        </Link>
        <figcaption>
          <Link href={`/nft/${tokenId}`}>
            <a>Endala #{tokenId}</a>
          </Link>
          {myMintIdentifier}
        </figcaption>
      </figure>
    </div>
  );
}

export default MiniThumb;
