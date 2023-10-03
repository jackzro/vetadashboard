"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function Chart({ datas, labels, title, datasets, unit }: any) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value: any) => {
            return `${value} ${unit}`;
          },
        },
      },
    },
  };

  const data = {
    labels,
    datasets: datasets(datas),
  };
  return (
    <div className="max-w-full h-96">
      <Line options={options} data={data} />
    </div>
  );
}
