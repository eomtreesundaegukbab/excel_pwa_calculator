import { useMemo, useState } from "react";
import { calcStoich } from "./calc/only_O2_in_density";
import StoichResultOnlyO2 from "./UI_UX/density_UI_only_O2";

function toNumber(value: string) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export default function AppOnlyO2() {
  const [phi, setPhi] = useState("0.9");

  const result = useMemo(() => {
    try {
      return calcStoich({ phi: toNumber(phi) });
    } catch {
      return null;
    }
  }, [phi]);

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "0 auto",
        padding: 20,
        backgroundColor: "var(--bg)",
        color: "var(--text)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: 8, color: "var(--text)" }}>
        Only O2 Density Calculator
      </h2>

      <div
        style={{
          marginBottom: 14,
          color: "var(--text-muted)",
          lineHeight: 1.5,
        }}
      >
        순수 O₂ 조건에서 Phi를 입력하면 dry 기준 CO₂ 농도와 O₂ 농도를 계산합니다.
      </div>

      <div
        style={{
          display: "grid",
          gap: 10,
          marginBottom: 20,
          padding: 16,
          border: "1px solid var(--border)",
          borderRadius: 14,
          backgroundColor: "var(--surface)",
          boxShadow: "var(--shadow)",
        }}
      >
        <label
          style={{
            color: "var(--text)",
            fontWeight: 600,
          }}
        >
          Phi
          <input
            value={phi}
            onChange={(e) => setPhi(e.target.value)}
            inputMode="decimal"
            placeholder="0.9"
            style={{
              display: "block",
              marginTop: 6,
              padding: "10px 12px",
              width: "100%",
              borderRadius: 8,
              border: "1px solid var(--border)",
              backgroundColor: "var(--input-bg)",
              color: "var(--text)",
              boxSizing: "border-box",
              fontSize: 15,
            }}
          />
        </label>
      </div>

      {result && (
        <StoichResultOnlyO2 co2Dry={result.co2Dry} o2Dry={result.o2Dry} />
      )}
    </div>
  );
}