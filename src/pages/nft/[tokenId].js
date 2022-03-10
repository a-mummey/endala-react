import { useRouter } from "next/router";
import { useRecoilValueLoadable } from "recoil";
import HeaderMetaTags from "../../components/HeaderMetaTags";
import NftDetails from "../../components/NftDetails";
import { allMintedTokensState, myMintedTokensState } from "../../state";
import { thumbUrl } from "../../utils/UrlHelper";

function NftInfo() {
  const router = useRouter();
  const { tokenId } = router.query;
  const allMintedTokens = useRecoilValueLoadable(allMintedTokensState);
  const myMintedTokens = useRecoilValueLoadable(myMintedTokensState);
  const myTokens = myMintedTokens.valueMaybe() || [];

  let currentTokenId;
  if (tokenId) {
    currentTokenId = tokenId;
  } else if (
    Array.isArray(allMintedTokens.valueMaybe()) &&
    allMintedTokens.valueMaybe()[0]
  ) {
    currentTokenId = allMintedTokens.valueMaybe()[0];
  } else {
    currentTokenId = 1;
  }
  const metaTags = {
    title: `Endala #${currentTokenId}`,
    image: thumbUrl(currentTokenId),
  };

  return (
    <div className="container">
      <NftDetails tokenId={currentTokenId}></NftDetails>
      <HeaderMetaTags metaTags={metaTags}></HeaderMetaTags>
    </div>
  );
}

export default NftInfo;
