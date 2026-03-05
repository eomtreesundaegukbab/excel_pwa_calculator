// src/calc/calibration.ts
import { mean, stdevS, linearRegression } from "./stats.ts";

export type CalMatrix = number[][]; // 5행 x 5열

export type CalRowResult = {
  rowIndex: number;   // 1~5
  values: number[];   // 길이 5
  mean: number;
  stdev: number;
};

export type CalibrationOutputs = {
  rows: CalRowResult[];
  regression: { a: number; b: number; r2: number }; // 평균값들로 회귀
  x: number[];     // 1..5
  yMean: number[]; // 평균값
  yFit: number[];  // 회귀선 값
};

export function calcCalibration(matrix: CalMatrix): CalibrationOutputs {
  // matrix는 [ [v1..v5], ... ] 5개 행 구성
  const rows: CalRowResult[] = matrix.map((vals, i) => {
    const m = mean(vals);
    const sd = stdevS(vals); // 엑셀 STDEV.S 동일
    return { rowIndex: i + 1, values: vals, mean: m, stdev: sd };
  });

  const x = rows.map(r => r.rowIndex);
  const yMean = rows.map(r => r.mean);

  const regression = linearRegression(x, yMean);
  const yFit = x.map(xi => regression.a * xi + regression.b);

  return { rows, regression, x, yMean, yFit };
}