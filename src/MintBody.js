import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { mintedTokenInfo } from "./state";
import "./MintBody.css";

function MintBody() {
  let nftData;
  const loadable = useRecoilValueLoadable(mintedTokenInfo);
  console.log(loadable);
  if (loadable.state == "hasValue") {
    nftData = loadable.contents;
  }

  //   const mintedNft = null;
  if (nftData && nftData.meta) {
    return (
      <main className="container">
        <dialog className="minted-wrap" open>
          <article>
            <header>
              <a href="#close" aria-label="Close" className="close"></a>
              <h3>{`${nftData.meta.name}: Rank ${nftData.rarity.rank}/${nftData.total}`}</h3>
            </header>

            <img src={nftData.imageUrl} />
          </article>
        </dialog>
      </main>
    );
  } else {
    return <div></div>;
  }
}
export default MintBody;
