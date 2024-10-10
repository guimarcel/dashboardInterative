import React from "react";

interface cryptoSelectedProps {
  coin: string;
  brlValue: number;
  float: number | undefined;
  logo: string | undefined;
}

export default function cryptoSelected({
  coin,
  brlValue,
  float,
  logo,
}: cryptoSelectedProps) {
  if (!float) return <></>;
  return (
    <div className="">
      <div className="flex items-center">
        <h2
          style={{ fontFamily: "var(--font-outfit)" }}
          className="font-extrabold text-4xl"
        >
          {coin.charAt(0).toUpperCase() + coin.slice(1)}
        </h2>
        <img src={logo} alt="logo-crypto" className="w-8 h-8 ml-2" />
      </div>
      <div className="flex">
        <p className="text-3xl">{brlValue.toLocaleString("pt-BR")}</p>
        <span className="text-stone-500 text-xs self-end">BRL</span>
      </div>
      <div className="flex items-center">
        <p
          className={`text-xl ${float > 0 ? "text-green-600" : "text-red-400"}`}
        >
          {Math.ceil(float * 10) / 10}%
        </p>
        {float > 0 ? (
          <span className="text-green-600 ml-2">↑</span>
        ) : (
          <span className="text-red-400 ml-2">↓</span>
        )}
        <span
          className={` ml-2 ${float > 0 ? "text-green-600" : "text-red-400"}`}
        >
          Hoje
        </span>
      </div>
    </div>
  );
}
