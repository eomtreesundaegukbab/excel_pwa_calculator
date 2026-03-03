// src/UI_UX/CalibrationTable.tsx
type Props = {
  values: string[][]; // 5x5 문자열(입력용)
  onChange: (r: number, c: number, v: string) => void;
};

export default function CalibrationTable({ values, onChange }: Props) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 520 }}>
        <thead>
          <tr>
            <th style={th}>Row</th>
            <th style={th}>V1</th>
            <th style={th}>V2</th>
            <th style={th}>V3</th>
            <th style={th}>V4</th>
            <th style={th}>V5</th>
          </tr>
        </thead>
        <tbody>
          {values.map((row, r) => (
            <tr key={r}>
              <td style={tdCenter}>{r + 1}</td>
              {row.map((cell, c) => (
                <td style={td} key={c}>
                  <input
                    value={cell}
                    onChange={(e) => onChange(r, c, e.target.value)}
                    style={input}
                    inputMode="decimal"
                    placeholder="0"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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

const td: React.CSSProperties = {
  border: "1px solid #e5e5e5",
  padding: "8px",
};

const tdCenter: React.CSSProperties = {
  ...td,
  textAlign: "center",
  fontWeight: 600,
  width: 60,
};

const input: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid #ddd",
  fontSize: 15,
};