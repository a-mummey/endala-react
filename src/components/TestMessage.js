import config from "../config";
import TestInstructions from "./TestInstructions";

function TestMessage() {
  return config.showTestnetMsg ? (
    <div className="container">
      <article>
        <TestInstructions></TestInstructions>
      </article>
    </div>
  ) : (
    <></>
  );
}
export default TestMessage;
