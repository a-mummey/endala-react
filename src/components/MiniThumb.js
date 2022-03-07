import {
  thumbUrl,
  miniUrl,
  metaUrl,
  rarityUrl,
  allRaritiesUrl,
} from "../utils/UrlHelper";
import "./MiniThumb.css";
import { Link } from "react-router-dom";

function MiniThumb({ tokenId }) {
  //   const nftDetailsLoadable = useRecoilValueLoadable(
  //     nftDetailsSelector(currentTokenId)
  //   );

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 col-xl-2">
      <figure>
        <Link to={`/my-endalas/${tokenId}`} className="miniThumb">
          <img src={miniUrl(tokenId)}></img>
        </Link>
        <figcaption>
          <Link to={`/my-endalas/${tokenId}`}>Endala #{tokenId}</Link>
        </figcaption>
      </figure>
    </div>
  );
}

export default MiniThumb;
