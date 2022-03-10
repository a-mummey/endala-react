import "./GalleryNav.scss";
import Pagination from "./Pagination";

function GalleryNav({ tokenId, allTokens }) {
  return (
    <Pagination
      nextLabel={"Next >"}
      prevLabel={"< Prev"}
      pagination={{
        items: allTokens,
        currentItem: tokenId,
        linkBase: "nft",
        itemsPerPage: 1,
      }}
    ></Pagination>
  );
}

export default GalleryNav;
