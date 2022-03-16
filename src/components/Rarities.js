import { useRecoilValueLoadable } from "recoil";
import { raritiesState } from "../state";
import MiniThumb from "../components/MiniThumb";
import "./Rarities.scss";

function Rarities() {
  const rarities = useRecoilValueLoadable(raritiesState).valueMaybe();
  console.log(rarities);
  const processRarities = Array.isArray(rarities)
    ? rarities.map((r) => {
        const name = `Endala #${r.id}`;
        return (
          <tr>
            <td className="img-cell">
              <MiniThumb tokenId={r.id} key={r.id}></MiniThumb>
            </td>
            <td className="rank-cell">{r.rank}</td>
            <td>{parseFloat(r.score).toFixed(2)}</td>
          </tr>
        );
      })
    : [];
  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th scope="col">&nbsp;</th>
            <th scope="col">Rank</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>{processRarities}</tbody>
      </table>
    </div>
  );
}

export default Rarities;
