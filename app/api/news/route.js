const API_KEY = process.env.NEXT_PUBLIC_NYTIMES_API_KEY;

export async function getNews() {
  try {
    const fetchNews = await fetch(
      `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`
    );
    const news = await fetchNews.json();
    return news;
  } catch (e) {
    return {
      status: 500,
      message: "An error occurred while processing your request.",
      error: error,
    };
  }
}
