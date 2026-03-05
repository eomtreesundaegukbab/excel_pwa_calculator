// src/calc/stats.ts
export function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

// 엑셀 STDEV.S (개같은 샘플 표준편차)와 동일 기능
export function stdevS(values: number[]): number {
  const n = values.length;
  if (n < 2) return 0;
  const m = mean(values);
  const varSum = values.reduce((acc, v) => acc + (v - m) ** 2, 0);
  return Math.sqrt(varSum / (n - 1));
}

// 단순 선형회귀 y = a*x + b 및 R^2일까?
export function linearRegression(xs: number[], ys: number[]) {
  const n = Math.min(xs.length, ys.length);
  if (n < 2) return { a: 0, b: 0, r2: 0 };

  const x = xs.slice(0, n);
  const y = ys.slice(0, n);

  const mx = mean(x);
  const my = mean(y);

  let sxx = 0, sxy = 0, syy = 0;
  for (let i = 0; i < n; i++) {
    const dx = x[i] - mx;
    const dy = y[i] - my;
    sxx += dx * dx;
    sxy += dx * dy;
    syy += dy * dy;
  }

  const a = sxx === 0 ? 0 : sxy / sxx;
  const b = my - a * mx;

  // R^2 = 1 - SSE/SST
  let sse = 0;
  for (let i = 0; i < n; i++) {
    const yhat = a * x[i] + b;
    sse += (y[i] - yhat) ** 2;
  }
  const sst = syy;
  const r2 = sst === 0 ? 0 : 1 - sse / sst;

  return { a, b, r2 };
}