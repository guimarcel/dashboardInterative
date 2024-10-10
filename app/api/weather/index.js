const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export async function getWeather(city) {
  try {
    const fetchWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=pt&units=metric`
    );
    const weather = await fetchWeather.json();
    return weather;
  } catch (e) {
    return {
      status: 500,
      message: "An error occurred while processing your request.",
      error: error,
    };
  }
}

export async function getForecast(city) {
  try {
    const fetchForecast = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&lang=pt&units=metric`
    );
    const forecast = await fetchForecast.json();
    return forecast;
  } catch (e) {
    return {
      status: 500,
      message: "An error occurred while processing your request.",
      error: error,
    };
  }
}
