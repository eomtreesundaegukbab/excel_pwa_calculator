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
  // 5x5 입력(문자열)
  const [grid, setGrid] = useState<string[][]>(() => make5x5("0"));

  const onChange = (r: number, c: number, v: string) => {
    setGrid((prev) => {
      const next = prev.map((row) => row.slice());
      next[r][c] = v;
      return next;
    });
  };

  // 숫자 행렬로 변환 후 계산
  const outputs = useMemo(() => {
    const matrix = grid.map((row) => row.map(toNumber));
    return calcCalibration(matrix);
  }, [grid]);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 18, fontFamily: "system-ui" }}>
      <h2 style={{ marginBottom: 6 }}>Calibration (5×5 입력 → Mean/STDev → 그래프)</h2>
      <div style={{ color: "#666", marginBottom: 14 }}>
        각 행에 V1~V5 값을 입력하면 Mean과 STDev.S(샘플 표준편차)가 자동 계산됩니다.
      </div>

      <CalibrationTable values={grid} onChange={onChange} />

      <hr style={{ margin: "18px 0" }} />

      <h3 style={{ margin: "0 0 10px 0" }}>행별 결과</h3>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 520 }}>
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

      <hr style={{ margin: "18px 0" }} />

      <h3 style={{ margin: "0 0 10px 0" }}>그래프 (Mean + 회귀선)</h3>
      <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 12 }}>
        <CalibrationChart x={outputs.x} yMean={outputs.yMean} yFit={outputs.yFit} />
        <div style={{ marginTop: 10, color: "#444" }}>
          회귀식: y = {outputs.regression.a.toFixed(6)} x + {outputs.regression.b.toFixed(6)} <br />
          R² = {outputs.regression.r2.toFixed(6)}
        </div>
      </div>
    </div>
  );
}

const th: React.CSSProperties = {
  border: "1px solid #e5e5e5",
  background: "#fafafa",
  padding: "10px 8px",
  fontSize: 13,
  textAlign: "center",
};

const tdBase: React.CSSProperties = {
  border: "1px solid #e5e5e5",
  padding: "8px",
};

const tdCenter: React.CSSProperties = {
  ...tdBase,
  textAlign: "center",
  fontWeight: 700,
  width: 80,
};

const tdNum: React.CSSProperties = {
  ...tdBase,
  textAlign: "right",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
};