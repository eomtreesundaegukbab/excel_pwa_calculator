import { useMemo, useState } from "react";
import CalibrationTable from "./UI_UX/calibration_table";
import CalibrationChart from "./UI_UX/calibration_chart";
import { calcCalibration } from "./calc/calibration";

function toNumber(s: string) {
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}

function make5x5(init = "0") {
  return Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => init));
}

export default function App() {
  const [grid, setGrid] = useState<string[][]>(() => make5x5("0"));

  const onChange = (r: number, c: number, v: string) => {
    setGrid((prev) => {
      const next = prev.map((row) => row.slice());
      next[r][c] = v;
      return next;
    });
  };

  const outputs = useMemo(() => {
    const matrix = grid.map((row) => row.map(toNumber));
    return calcCalibration(matrix);
  }, [grid]);

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: 18,
        fontFamily: "system-ui",
        backgroundColor: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <h2
        style={{
          marginBottom: 6,
          color: "var(--text)",
          fontWeight: 700,
        }}
      >
        Calibration (5×5 입력 → Mean/STDev → 그래프)
      </h2>

      <div
        style={{
          color: "var(--muted)",
          marginBottom: 14,
        }}
      >
        각 행에 V1~V5 값을 입력하면 Mean과 STDev.S(샘플 표준편차)가 자동 계산됩니다.
      </div>

      <CalibrationTable values={grid} onChange={onChange} />

      <hr
        style={{
          margin: "18px 0",
          border: 0,
          borderTop: "1px solid var(--border)",
        }}
      />

      <h3
        style={{
          margin: "0 0 10px 0",
          color: "var(--text)",
          fontWeight: 700,
        }}
      >
        행별 결과
      </h3>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            minWidth: 520,
            backgroundColor: "var(--surface)",
            color: "var(--text)",
            boxShadow: "var(--shadow)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <thead>
            <tr>
              <th style={th}>Row</th>
              <th style={th}>Mean</th>
              <th style={th}>STDev.S</th>
            </tr>
          </thead>
          <tbody>
            {outputs.rows.map((r) => (
              <tr key={r.rowIndex}>
                <td style={tdCenter}>{r.rowIndex}</td>
                <td style={tdNum}>{r.mean.toFixed(6)}</td>
                <td style={tdNum}>{r.stdev.toFixed(6)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr
        style={{
          margin: "18px 0",
          border: 0,
          borderTop: "1px solid var(--border)",
        }}
      />

      <h3
        style={{
          margin: "0 0 10px 0",
          color: "var(--text)",
          fontWeight: 700,
        }}
      >
        그래프 (Mean + 회귀선)
      </h3>

      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: 14,
          padding: 12,
          backgroundColor: "var(--surface)",
          color: "var(--text)",
          boxShadow: "var(--shadow)",
        }}
      >
        <CalibrationChart x={outputs.x} yMean={outputs.yMean} yFit={outputs.yFit} />

        <div
          style={{
            marginTop: 10,
            color: "var(--text)",
            fontWeight: 600,
          }}
        >
          회귀식: y = {outputs.regression.a.toFixed(6)} x + {outputs.regression.b.toFixed(6)}
          <br />
          R² = {outputs.regression.r2.toFixed(6)}
        </div>
      </div>
    </div>
  );
}

const th: React.CSSProperties = {
  border: "1px solid var(--border)",
  background: "var(--surface-2)",
  padding: "10px 8px",
  fontSize: 13,
  textAlign: "center",
  color: "var(--text)",
  fontWeight: 700,
};

const tdBase: React.CSSProperties = {
  border: "1px solid var(--border)",
  padding: "8px",
  backgroundColor: "var(--surface)",
  color: "var(--text)",
};

const tdCenter: React.CSSProperties = {
  ...tdBase,
  textAlign: "center",
  fontWeight: 700,
  width: 80,
  color: "var(--text)",
  opacity: 1,
};

const tdNum: React.CSSProperties = {
  ...tdBase,
  textAlign: "right",
  color: "var(--text)",
  fontWeight: 700,
  opacity: 1,
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
};