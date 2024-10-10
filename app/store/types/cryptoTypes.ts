export interface CryptoPriceResponse {
    [key: string]: {
      usd: number;
      // Adicione outras moedas se necessário
    };
  }

  export interface Coins {
    id: string;
    symbol: string;
    name: string;
  } 
  
  export interface Coin {
    id: string;
    symbol: string;
    name: string;
    market_data:{
        price_change_percentage_24h_in_currency: {
            brl: number
        }
    }
    image: {
        small: string;
    };
  }
  
  export interface CoinHistory {
    prices: [number,number][];
  }
    