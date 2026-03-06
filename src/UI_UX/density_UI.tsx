type Props = {
  co2Dry: number;
  o2Dry: number;
};

export default function StoichResult({ co2Dry, o2Dry }: Props) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 12,
          padding: 14,
          background: "#fff",
        }}
      >
        <div style={{ fontSize: 14, color: "#555" }}>CO2 농도 (dry)</div>
        <div style={{ fontSize: 22, fontWeight: 700 }}>{co2Dry.toFixed(9)}</div>
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 12,
          padding: 14,
          background: "#fff",
        }}
      >
        <div style={{ fontSize: 14, color: "#555" }}>O2 농도 (dry)</div>
        <div style={{ fontSize: 22, fontWeight: 700 }}>{o2Dry.toFixed(9)}</div>
      </div>
    </div>
  );
}