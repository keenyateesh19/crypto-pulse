import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

const API_URL = import.meta.env.VITE_API_COIN_URL;

const CoinChart = ({ coinId, currency, locale }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  const symbol = currency === "inr" ? '₹' : '$';

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
      },
      body: undefined,
    };
    const fetchPrices = async () => {
      try{
        const response = await fetch(
        `${API_URL}/${coinId}/market_chart?vs_currency=${currency}&days=7`,
        options
      );
      const data = await response.json();
      const prices = data.prices.map((price) => ({
        x: price[0],
        y: price[1],
      }));
      setChartData({
        datasets: [
          {
            label: `Price (${currency.toUpperCase()})`,
            data: prices,
            fill: true,
            borderColor: "#007bff",
            backgroundColor: "rgba(0, 123, 255, 0.1)",
            pointRadius: 0,
            tension: 0.3,
          },
        ],
      });
      } catch(err) {
        console.error(err.message)
      }
      setLoading(false);
    };

    fetchPrices();
  }, [coinId, currency]);

  if (loading || !chartData) {
    return <div className="chart">Loading chart...</div>;
  }
  return (
    <div className="chart">
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { mode: "index", intersect: false },
           },
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day",
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 7,
              },
            },
            y: {
              ticks: {
                callback: (value) => `${symbol}${value.toLocaleString(locale)}`,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default CoinChart;
