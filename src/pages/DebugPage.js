import { useEffect } from "react";

function DebugPage() {
  useEffect(() => {
    setTimeout(() => {
      console.log("yo");
      throw new Error("testing errors rebuild");
    }, 1000);
  });

  return (
    <div className="container">
      <h2>Debugging</h2>
    </div>
  );
}

export default DebugPage;
