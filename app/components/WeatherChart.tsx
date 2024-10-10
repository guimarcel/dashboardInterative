"use client";

import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./../store/hooks";
import { fetchWeather, fetchForecast } from "./../store/slices/weatherSlice";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import "chartjs-adapter-date-fns";
import WeatherSelected from "../elements/weatherSelected";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const WeatherChart = () => {
  const dispatch = useAppDispatch();
  const weatherData = useAppSelector((state) => state.weather.weather);
  const weatherStatus = useAppSelector((state) => state.weather.statusWeather);
  const forecastData = useAppSelector((state) => state.weather.forecast);
  const forecastStatus = useAppSelector(
    (state) => state.weather.statusForecast
  );
  const [days, setDays] = useState(1);
  const [openSearch, setOpenSearch] = useState(false);
  const [city, setCity] = useState("São Paulo");
  const chartRef = useRef(null);

  useEffect(() => {
    dispatch(fetchWeather(city));
    dispatch(fetchForecast(city));
  }, []);

  useEffect(() => {}, [days]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenSearch(false);
    if (city.trim() !== "") {
      dispatch(fetchWeather(city));
      dispatch(fetchForecast(city));
    }
  };

  if (weatherStatus === "loading" || forecastStatus === "loading") {
    return <div>Carregando...</div>;
  }

  if (weatherStatus === "failed" || forecastStatus === "failed") {
    return <div>Erro ao carregar os dados.</div>;
  }

  if (!forecastData || !forecastData.list) {
    return <div>Dados indisponíveis</div>;
  }

  // Processar dados para o gráfico
  const chartDataPoints = forecastData.list.map((item: any) => ({
    x: new Date(item.dt_txt),
    y: item.main.temp,
  }));

  const maxTemp = Math.max(...chartDataPoints.map((point) => point.y));
  const minTemp = Math.min(...chartDataPoints.map((point) => point.y));

  const data = {
    datasets: [
      {
        label: "Temperatura (°C)",
        data: chartDataPoints,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.4,
        pointRadius: 2, // Define o raio dos pontos, tornando-os visíveis
        pointHoverRadius: 6, // Aumenta o raio de interação ao passar o mouse
      },
      {
        label: "Máx",
        data: chartDataPoints.filter((point) => point.y === maxTemp),
        backgroundColor: "rgba(255, 0, 0, 0.8)",
        borderColor: "rgba(255, 0, 0, 0.8)",
        pointRadius: 5,
      },
      {
        label: "Mín",
        data: chartDataPoints.filter((point) => point.y === minTemp),
        backgroundColor: "rgba(0, 0, 255, 0.8)",
        borderColor: "rgba(0, 0, 255, 0.8)",
        pointRadius: 5,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          displayFormats: {
            hour: "HH",
          },
          tooltipFormat: "HH:mm",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 4,
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const date = new Date(context.parsed.x);
            const dateString = date.toLocaleDateString("pt-BR");
            const timeString = date.toLocaleTimeString("pt-BR");
            const temp = context.parsed.y.toFixed(1);
            return `Data: ${dateString}, Hora: ${timeString}, Temperatura: ${temp}°C`;
          },
        },
        mode: "nearest", // Exibe o tooltip para o ponto mais próximo
        intersect: false, // Permite exibir o tooltip mesmo sem estar diretamente sobre o ponto
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
  };

  const handleIntervalChange = (days: number) => {
    setDays(days);
  };

  return (
    <div className="p-6">
      <div className="mb-2">
        {!openSearch ? (
          <button onClick={() => setOpenSearch(true)}>🔍▾</button>
        ) : (
          <form onSubmit={handleSubmit} className="">
            <input
              type="text"
              // value={city}
              onBlur={() => setOpenSearch(false)}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Digite a cidade aqui"
              className="border border-white p-2 mr-2"
            />
          </form>
        )}
      </div>
      <WeatherSelected weather={weatherData} />
      Previsão próximos 5 dias:
      <div className="ml-[-25px]">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default WeatherChart;
