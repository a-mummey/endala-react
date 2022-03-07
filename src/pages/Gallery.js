import { useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import MiniThumbList from "../components/MiniThumbList";
import Pagination from "../components/Pagination";
import config from "../config";
import { allMintedTokensState } from "../state";

function Gallery() {
  const params = useParams();
  const pageParam = isNaN(parseInt(params.page)) ? 1 : parseInt(params.page);
  const allMintedTokens = useRecoilValueLoadable(allMintedTokensState);

  const tokenIds = allMintedTokens.valueMaybe() || [];
  const tokenIdsStart = (pageParam - 1) * config.numGallery;
  const pagedTokenIds = [...tokenIds]
    .sort((a, b) => parseInt(a) - parseInt(b))
    .slice(tokenIdsStart, tokenIdsStart + config.numGallery);

  const pagination = {
    totalItems: tokenIds.length,
    currentPage: pageParam,
    linkBase: "gallery",
    itemsPerPage: config.numGallery,
  };

  return (
    <div className="container">
      <h2>Minted Endalas</h2>
      <div className="grid">
        <MiniThumbList tokenIds={pagedTokenIds}></MiniThumbList>
      </div>
      <Pagination pagination={pagination}></Pagination>
    </div>
  );
}

export default Gallery;
