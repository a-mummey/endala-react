import MiniThumb from "./MiniThumb";

function MiniThumbList({ tokenIds }) {
  const miniThumbs = (tokenIds || []).map((tokenId) => (
    <div className="miniThumb col-sm-6 col-md-4 col-lg-3 col-xl-2">
      <MiniThumb tokenId={tokenId} key={tokenId}></MiniThumb>
    </div>
  ));
  return <div className="row">{miniThumbs}</div>;
}
export default MiniThumbList;
