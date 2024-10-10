/* app/page.tsx */
import React from "react";
import WeatherChart from "./components/WeatherChart";
import CryptoChart from "./components/CryptoChart";
import NewsList from "./components/NewsList";
import Image from "next/image";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex gap-5 justify-center bg-[#001654] p-4">
        <Image src={"/ob.webp"} width={100} height={100} alt="Logo" />
      </header>

      <main className="container mx-auto p-4 grid gap-10 lg:grid-cols-2">
        <div className="bg-white rounded-3xl shadow-2xl p-4 min-h-96">
          <CryptoChart />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-4 min-h-96">
          <WeatherChart />
        </div>

        <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl p-4  min-h-96">
          <NewsList />
        </div>
      </main>
    </div>
  );
};

export default Home;
