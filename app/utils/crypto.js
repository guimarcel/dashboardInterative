export async function getCrypto(coin) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=brl`
    );
    const crypto = await response.json();
    return crypto;
  } catch (error) {
    return {
      status: 500,
      message: "Ocorreu um erro ao processar sua solicitação.",
      error: error.message,
    };
  }
}

export async function getCoins() {
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/list`);
    const coins = await response.json();
    return coins;
  } catch (error) {
    return {
      status: 500,
      message: "Ocorreu um erro ao processar sua solicitação.",
      error: error.message,
    };
  }
}

export async function getCoin(id) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );
    const coin = await response.json();
    return coin;
  } catch (error) {
    return {
      status: 500,
      message: "Ocorreu um erro ao processar sua solicitação.",
      error: error.message,
    };
  }
}

export async function getCoinHistory(filter) {
  try {
    const [coin, days] = filter;
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=brl&days=${days}`
    );
    const coinHistory = await response.json();
    return coinHistory;
  } catch (error) {
    return {
      status: 500,
      message: "Ocorreu um erro ao processar sua solicitação.",
      error: error.message,
    };
  }
}
