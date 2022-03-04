import { useRecoilValueLoadable } from "recoil";
import { myTokensSelector } from "../state";
import "./MyEndalas.css";

function endalaList(tokenIds) {
  return tokenIds.map((item, index) => <li key={item}>Endala #{item}</li>);
}
function MyEndalas() {
  const myTokensState = useRecoilValueLoadable(myTokensSelector);
  const myTokens =
    myTokensState.state === "hasValue" ? myTokensState.contents : [];

  return (
    <div className="container">
      <div className="endalas-container">
        <div className="leftCol">
          <ul>{endalaList(myTokens)}</ul>
        </div>
        <div className="mainCol">
          <article>asdfasdf</article>
        </div>
      </div>
    </div>
  );
}

export default MyEndalas;
