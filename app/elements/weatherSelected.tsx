import React from "react";
import { WeatherResponse } from "../store/types/weatherTypes";

interface weatherSelectedProps {
  weather: WeatherResponse | null;
}

export default function weatherSelected(props: weatherSelectedProps) {
  if (!props.weather) return;
  const { main, name, wind, weather } = props.weather;
  const { feels_like, humidity, temp, temp_max, temp_min } = main;
  const { speed } = wind;

  return (
    <div className="">
      <h2
        style={{ fontFamily: "var(--font-outfit)" }}
        className=" font-extrabold text-3xl"
      >
        {name}
      </h2>

      <div className="flex items-center">
        <img
          src={"http://openweathermap.org/img/w/" + weather[0].icon + ".png"}
          alt="logo-crypto"
          className="w-16 h-16"
        />

        <div className="flex content-between">
          <div className="">
            <span className="mr-2">{Math.round(temp)}°</span>
            <span>
              {weather[0].description[0].toUpperCase() +
                weather[0].description.substring(1)}
            </span>
            <div className="flex">
              <p className="text-sm mr-2 text-slate-500">
                Máx:{Math.round(temp_max)}°
              </p>
              <p className="text-sm text-slate-500">
                Min:{Math.round(temp_min)}°
              </p>
            </div>
          </div>
          <div className="ml-2 text-end">
            <p className="text-sm">Umidade: {humidity}%</p>
            <p className="text-sm">Sensação: {Math.round(feels_like)}°</p>
            <p className="text-sm">Vel. Vento: {Math.round(speed)}m/s</p>
          </div>
        </div>
      </div>
    </div>
  );

  //   if (!float) return <></>;
  //   return (
  //     <div className="">
  //       <div className="flex items-center">
  //         <h2
  //           style={{ fontFamily: "Outfit" }}
  //           className="font-extrabold text-4xl"
  //         >
  //           {coin.charAt(0).toUpperCase() + coin.slice(1)}
  //         </h2>
  //         <img src={logo} alt="logo-weather" className="w-8 h-8 ml-2" />
  //       </div>
  //       <div className="flex">
  //         <p className="text-3xl">{brlValue.toLocaleString("pt-BR")}</p>
  //         <span className="text-stone-500 text-xs self-end">BRL</span>
  //       </div>
  //       <div className="flex items-center">
  //         <p
  //           className={`text-xl ${float > 0 ? "text-green-600" : "text-red-400"}`}
  //         >
  //           {Math.ceil(float * 10) / 10}%
  //         </p>
  //         {float > 0 ? (
  //           <span className="text-green-600 ml-2">↑</span>
  //         ) : (
  //           <span className="text-red-400 ml-2">↓</span>
  //         )}
  //         <span
  //           className={` ml-2 ${float > 0 ? "text-green-600" : "text-red-400"}`}
  //         >
  //           Hoje
  //         </span>
  //       </div>
  //     </div>
  //   );
}
