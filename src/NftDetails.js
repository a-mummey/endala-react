import NftAttributes from "./NftAttributes";
function NftDetails({ nftDetails }) {
  return (
    <article>
      <div className="img-container">
        <div className="img-preview">
          <img src={nftDetails.imageUrl}></img>
        </div>
        <div className="img-properties">
          <hgroup>
            <h2>{nftDetails.meta.name}</h2>
            <h3>
              Rank: {nftDetails.rarity.rank} / {nftDetails.total}
            </h3>
          </hgroup>
          <NftAttributes nftRarity={nftDetails.rarity}></NftAttributes>
        </div>
      </div>
    </article>
  );
}
export default NftDetails;
