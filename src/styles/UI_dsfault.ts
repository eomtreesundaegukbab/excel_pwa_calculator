import type { CSSProperties } from "react";

export const pageStyle: CSSProperties = {
  maxWidth: 900,
  margin: "0 auto",
  padding: 18,
  fontFamily: "system-ui, sans-serif",
  color: "var(--text)",
  backgroundColor: "transparent",
};

export const cardStyle: CSSProperties = {
  backgroundColor: "var(--surface)",
  color: "var(--text)",
  border: "1px solid var(--border)",
  borderRadius: 14,
  boxShadow: "var(--shadow)",
};

export const titleStyle: CSSProperties = {
  color: "var(--text)",
  fontWeight: 700,
};

export const descStyle: CSSProperties = {
  color: "var(--text-muted)",
};

export const inputStyle: CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid var(--border)",
  backgroundColor: "var(--input-bg)",
  color: "var(--text)",
  boxSizing: "border-box",
  fontSize: 15,
};

export const tableHeaderStyle: CSSProperties = {
  border: "1px solid var(--border)",
  backgroundColor: "var(--surface-2)",
  color: "var(--text)",
  padding: "10px 8px",
  textAlign: "center",
  fontWeight: 700,
};

export const tableCellStyle: CSSProperties = {
  border: "1px solid var(--border)",
  backgroundColor: "var(--surface)",
  color: "var(--text)",
  padding: "8px",
};

export const resultValueStyle: CSSProperties = {
  color: "var(--text)",
  fontWeight: 700,
  fontSize: 22,
  fontFamily:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
};