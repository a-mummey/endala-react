import { useParams, useSearchParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import MiniThumbList from "../components/MiniThumbList";
import Pagination from "../components/Pagination";
import config from "../config";
import { myMintedTokensState, sortedMintedTokensSelector } from "../state";

function Gallery() {
  const params = useParams();
  const pageParam = isNaN(parseInt(params.page)) ? 1 : parseInt(params.page);
  const allMintedTokens =
    useRecoilValueLoadable(sortedMintedTokensSelector).valueMaybe() || [];
  const myMintedTokens =
    useRecoilValueLoadable(myMintedTokensState).valueMaybe() || [];

  const [searchParams, setSearchParams] = useSearchParams();
  const filterOwned = searchParams.get("filter_owned") === "true";

  const tokenIds = filterOwned ? myMintedTokens : allMintedTokens;

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

  const toggleMyEndalas = (e) => {
    const { fitler_owned: remove, ...rest } = searchParams;
    const newParams = e.target.checked
      ? { ...searchParams, filter_owned: true }
      : rest;
    setSearchParams(newParams);
  };

  return (
    <div className="container">
      <hgroup>
        <h2>Minted Endalas</h2>
        <fieldset>
          <label htmlFor="switch">
            <input
              type="checkbox"
              id="switch"
              name="switch"
              role="switch"
              onChange={toggleMyEndalas}
              checked={filterOwned}
            />
            Filter My Endalas
          </label>
        </fieldset>
      </hgroup>
      <div className="grid">
        <MiniThumbList tokenIds={pagedTokenIds}></MiniThumbList>
      </div>
      <Pagination pagination={pagination}></Pagination>
    </div>
  );
}

export default Gallery;
