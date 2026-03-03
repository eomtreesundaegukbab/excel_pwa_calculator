// src/UI_UX/CalibrationChart.tsx
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

type Props = {
  x: number[];      // 1..5
  yMean: number[];  // 평균
  yFit: number[];   // 회귀선
};

export default function CalibrationChart({ x, yMean, yFit }: Props) {
  const labels = x.map(String);

  const data = {
    labels,
    datasets: [
      {
        label: "Mean",
        data: yMean,
        tension: 0.2,
        borderColor: "#2563eb",        // 선 색
        backgroundColor: "#2563eb33",  // 점/면 색 (투명도 포함)
        pointBackgroundColor: "#2563eb",
        pointBorderColor: "#2563eb",
        borderWidth: 3,
      },
      {
        label: "Linear fit",
        data: yFit,
        tension: 0,
        borderColor: "#dc2626",
        backgroundColor: "#dc2626",
        pointRadius: 0,        // 회귀선은 점 제거
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "top" as const } },
    scales: {
      x: { title: { display: true, text: "Row (1~5)" } },
      y: { title: { display: true, text: "Mean" } },
    },
  };

  return <Line data={data} options={options} />;
}