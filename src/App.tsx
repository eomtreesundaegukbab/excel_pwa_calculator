import { useState } from "react";
import AppCalibration from "./App_calibration";
import AppStoich from "./App_density";
import AppOnlyO2 from "./App_only_O2";

export default function App() {
  const [page, setPage] = useState<"calibration" | "stoich" | "only_O2">("calibration");

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <h1>Calculation App</h1>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button onClick={() => setPage("calibration")}>Calibration</button>
        <button onClick={() => setPage("stoich")}>Density</button>
        <button onClick={() => setPage("only_O2")}>Density</button>
      </div>

      {page === "calibration" && <AppCalibration />}
      {page === "stoich" && <AppStoich />}
      {page === "only_O2" && <AppOnlyO2 />}
    </div>
  );
}
// 실행은 터미널에서 npm run dev
// 배포는 npm run build, npm run deploy
//git add .
//git commit -m "update"
//git push
// 수정 후 위 코드 3줄 실행하면 반영됨
//새계산기 추가:import AppOnlyNH3 from "./App_???";
//const [page, setPage] = useState<"calibration" | "stoich" | "???">("calibration");
// <button onClick={() => setPage("???")}>???</button>
//{page === "???" && <App??? />}