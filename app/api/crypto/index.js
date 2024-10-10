export async function getCrypto(coin) {
  try {
    const fetchCrypto = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=brl`
    );
    const crypto = await fetchCrypto.json();
    return crypto;
  } catch (e) {
    return {
      status: 500,
      message: "An error occurred while processing your request.",
      error: error,
    };
  }
}
export async function getCoins() {
  try {
    const fetchCoinList = await fetch(
      `https://api.coingecko.com/api/v3/coins/list`
    );
    const coins = await fetchCoinList.json();
    return coins;
  } catch (e) {
    return {
      status: 500,
      message: "An error occurred while processing your request.",
      error: error,
    };
  }
}
export async function getCoin(id) {
  try {
    const fetchCoin = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );
    const coin = await fetchCoin.json();
    return coin;
  } catch (e) {
    return {
      status: 500,
      message: "An error occurred while processing your request.",
      error: error,
    };
  }
}

export async function getCoinHistory(filter) {
  try {
    const fetchCoinHistory = await fetch(
      `https://api.coingecko.com/api/v3/coins/${filter[0]}/market_chart?vs_currency=brl&days=${filter[1]}`
    );
    const coinHistory = await fetchCoinHistory.json();
    return coinHistory;
  } catch (e) {
    return {
      status: 500,
      message: "An error occurred while processing your request.",
      error: error,
    };
  }
}
