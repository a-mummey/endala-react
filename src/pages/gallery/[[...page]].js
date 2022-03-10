import { useRouter } from "next/router";
import { useRecoilValueLoadable } from "recoil";
import MiniThumbList from "../../components/MiniThumbList";
import Pagination from "../../components/Pagination";
import config from "../../config";
import { sortedMintedTokensSelector } from "../../state";

function Gallery() {
  const router = useRouter();
  const { page } = router.query;
  const pageParam = isNaN(parseInt(page)) ? 1 : parseInt(page);
  const allMintedTokens = useRecoilValueLoadable(sortedMintedTokensSelector);

  const tokenIds = allMintedTokens.valueMaybe() || [];
  const tokenIdsStart = (pageParam - 1) * config.numGallery;
  const pagedTokenIds = [...tokenIds].slice(
    tokenIdsStart,
    tokenIdsStart + config.numGallery
  );

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
