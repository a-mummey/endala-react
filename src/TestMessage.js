import config from "./config";
import TestInstructions from "./TestInstructions";

function TestMessage() {
  const testMessage = config.testnet ? (
    <TestInstructions></TestInstructions>
  ) : (
    ""
  );
  return (
    <div className="container">
      <article>{testMessage}</article>
    </div>
  );
}
export default TestMessage;
