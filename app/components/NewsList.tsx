"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchNews } from "../store/slices/newsSlice";
import Image from "next/image";

const NewsList = () => {
  const dispatch = useAppDispatch();
  const newsData = useAppSelector((state) => state.news.data);
  const newsStatus = useAppSelector((state) => state.news.status);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (newsStatus === "loading") {
    return <div>Carregando...</div>;
  }

  if (!newsData) {
    return <div>Dados indisponíveis</div>;
  }

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedNews = newsData.slice(startIndex, endIndex);

  const handleNext = () => {
    if (endIndex < newsData.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="p-2">
      <div
        style={{ borderBottom: "2px solid #CCC" }}
        className="flex items-center mb-4 justify-between"
      >
        <div className="flex items-center mb-2">
          <Image src={"/noticia.png"} width={20} height={20} alt="Logo" />
          <h1
            style={{ fontFamily: "var(--font-outfit)" }}
            className="ml-4 font-extrabold text-4xl"
          >
            Notícias
          </h1>
        </div>

        <div className="flex justify-end ">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="px-2 py-2  text-black rounded-3xl disabled:bg-gray-300"
          >
            <Image src={"/de-volta.png"} width={20} height={20} alt="Voltar" />
          </button>
          <button
            onClick={handleNext}
            disabled={endIndex >= newsData.length}
            className="px-2 py-2  text-black rounded-3xl disabled:bg-gray-300"
          >
            <Image src={"/proximo.png"} width={20} height={20} alt="Próximo" />
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {displayedNews.map((article: any) => (
          <a
            key={article.url}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block bg-white border rounded-md shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="relative w-full h-[330px]">
              <img
                src={article?.multimedia[0]?.url}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h3 className="text-white text-sm font-semibold line-clamp-4">
                {article.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
