import MiniThumbList from "./MiniThumbList";

function LatestMints() {
  return (
    <div className="container">
      <h2>Latest Mints</h2>
      <div className="grid">
        <MiniThumbList tokenIds={[1, 2, 3]}></MiniThumbList>
      </div>
    </div>
  );
}
export default LatestMints;
