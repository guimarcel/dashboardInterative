"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./../store/hooks";
import {
  fetchCrypto,
  fetchCoin,
  fetchCoinHistory,
  fetchCoinList,
} from "./../store/slices/cryptoSlice";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import "chartjs-adapter-date-fns";
import CryptoSelected from "../elements/cryptoSelected";
import { CoinHistory } from "../store/types/cryptoTypes";
import Select from "react-select";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

const CryptoChart = () => {
  const dispatch = useAppDispatch();
  const cryptoData = useAppSelector((state) => state.crypto.data);
  const cryptoStatus = useAppSelector((state) => state.crypto.status);
  const coinHistory = useAppSelector(
    (state) => state.crypto.coinHistory
  ) as CoinHistory | null;
  const coinList = useAppSelector((state) => state.crypto.coinList);
  const coinRedux = useAppSelector((state) => state.crypto.coin);

  const [coin, setCoin] = useState("bitcoin");
  const [days, setDays] = useState(1); // Estado para o intervalo de dias

  useEffect(() => {
    dispatch(fetchCoin(coin.toLowerCase()));
    dispatch(fetchCrypto(coin.toLowerCase()));
    dispatch(fetchCoinHistory([coin, days]));
    dispatch(fetchCoinList());
  }, [dispatch, coin, days]);

  const handleIntervalChange = (days: number) => {
    setDays(days);
  };

  if (cryptoStatus === "loading") {
    return <div>Carregando...</div>;
  }

  if (!cryptoData || !cryptoData[coin.toLowerCase()]) {
    return <div>Dados indisponíveis</div>;
  }

  const coinData = cryptoData[coin.toLowerCase()];

  const pricesData: [number, number][] = coinHistory?.prices || [];

  // if (pricesData.length === 0) {
  //   return <div>Carregando dados históricos...</div>;
  // }

  // Definir o tipo de unit corretamente
  type TimeUnit =
    | false
    | "millisecond"
    | "second"
    | "minute"
    | "hour"
    | "day"
    | "week"
    | "month"
    | "quarter"
    | "year";

  const unit: TimeUnit = days <= 1 ? "hour" : "day";

  const chartData = {
    datasets: [
      {
        label: `Flutuação`,
        data: pricesData.map(([timestamp, price]) => ({
          x: timestamp,
          y: price,
        })),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: unit,
        },
      },
      y: {
        title: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const date = new Date(context.parsed.x).toLocaleDateString();
            const price = context.parsed.y.toFixed(2);
            return `Data: ${date}, Preço: R$${price}`;
          },
        },
      },
    },
  };

  const optionsSelect = coinList?.map((coinItem) => ({
    value: coinItem.id,
    label: `${coinItem.name} (${coinItem.symbol.toUpperCase()})`,
  }));

  return (
    <div className="p-6">
      <Select
        options={optionsSelect}
        value={null}
        onChange={(selectedOption) => {
          setCoin(selectedOption?.value || "bitcoin");
        }}
        pageSize={10}
        placeholder={<span>🔍▾</span>}
        styles={{
          control: (base) => ({
            ...base,
            border: "none",
            boxShadow: "none",
            "&:hover": {
              border: "none",
            },
          }),
        }}
        components={{
          IndicatorSeparator: () => null,
          IndicatorsContainer: () => null,
        }}
        className="mb-2 focus:w-full"
      />

      <CryptoSelected
        coin={coin}
        brlValue={cryptoData[coin].brl}
        float={
          coinRedux?.market_data.price_change_percentage_24h_in_currency.brl
        }
        logo={coinRedux?.image.small}
      />

      {/* Botões para selecionar o intervalo de tempo */}
      <div className="flex space-x-4 w-fit">
        {[
          { label: "1D", value: 1 },
          { label: "7D", value: 7 },
          { label: "1M", value: 30 },
          { label: "1A", value: 365 },
        ].map((interval, key) => (
          <div key={interval.value} style={{ margin: "0px" }}>
            <button
              onClick={() => handleIntervalChange(interval.value)}
              className={`px-2 mt-2 ${
                days === interval.value
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
            >
              {interval.label}
            </button>
            {key < 3 && <span className="ml-2 border-r-2 border-slate-400" />}
          </div>
        ))}
      </div>

      <Line data={chartData} options={options} />
    </div>
  );
};

export default CryptoChart;
