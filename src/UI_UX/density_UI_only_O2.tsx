type Props = {
  co2Dry: number;
  o2Dry: number;
};

export default function StoichResultOnlyO2({ co2Dry, o2Dry }: Props) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: 14,
          background: "var(--surface)",
          color: "var(--text)",
          boxShadow: "var(--shadow)",
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: "var(--text-muted)",
            marginBottom: 6,
          }}
        >
          CO2 농도 (dry)
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "var(--text)",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          }}
        >
          {co2Dry.toFixed(9)}
        </div>
      </div>

      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: 14,
          background: "var(--surface)",
          color: "var(--text)",
          boxShadow: "var(--shadow)",
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: "var(--text-muted)",
            marginBottom: 6,
          }}
        >
          O2 농도 (dry)
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "var(--text)",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          }}
        >
          {o2Dry.toFixed(9)}
        </div>
      </div>
    </div>
  );
}