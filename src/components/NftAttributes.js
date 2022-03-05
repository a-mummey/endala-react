function NftAttributes({ nftRarity }) {
  //   console.log(nftRarity);
  const rows = nftRarity ? (
    nftRarity.attributes.map((a) => {
      return (
        <tr key={a.trait_type}>
          <td>
            <strong>{a.trait_type}</strong>
          </td>
          <td>{a.value}</td>
          <td>{parseFloat(a.percentage * 100).toFixed(2)}%</td>
          <td>{parseFloat(a.score).toFixed(2)}</td>
        </tr>
      );
    })
  ) : (
    <tr></tr>
  );
  const totalScore = nftRarity ? parseFloat(nftRarity.score).toFixed(2) : "?";
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Attribute</th>
          <th scope="col">Value</th>
          <th scope="col">% With</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
      <tfoot>
        <tr>
          <td scope="col" colSpan={3}>
            <strong>Total Score</strong>
          </td>
          <td scope="col">
            <strong>
              <ins>{totalScore}</ins>
            </strong>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default NftAttributes;
