import MiniThumb from "./MiniThumb";

function MiniThumbList({ tokenIds }) {
  const miniThumbs = (tokenIds || []).map((tokenId) => (
    <MiniThumb tokenId={tokenId} key={tokenId}></MiniThumb>
  ));
  return <div className="row">{miniThumbs}</div>;
}
export default MiniThumbList;
