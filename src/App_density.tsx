import { useMemo, useState } from "react";
import { calcStoich } from "./calc/CO2_O2_density";
import StoichResult from "./UI_UX/density_UI";

function toNumber(value: string) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export default function AppStoich() {
  const [phi, setPhi] = useState("0.7");

  const result = useMemo(() => {
    try {
      return calcStoich({ phi: toNumber(phi) });
    } catch {
      return null;
    }
  }, [phi]);

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
      <h2>Stoich Calculator</h2>

      <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
        <label>
          Phi
          <input
            value={phi}
            onChange={(e) => setPhi(e.target.value)}
            style={{
              display: "block",
              marginTop: 6,
              padding: "10px 12px",
              width: "100%",
              borderRadius: 8,
              backgroundColor: "#ffffff",
              color: "#000000",
            }}
          />
        </label>
      </div>

      {result && <StoichResult co2Dry={result.co2Dry} o2Dry={result.o2Dry} />}
    </div>
  );
}