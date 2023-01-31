import marketData from "./market-data";
import news from "./news";
import trader from "./trader";

export class AlpacaClient {
  protected marketsHost = "https://data.alpaca.markets";
  protected traderHost = "https://paper-api.alpaca.markets";
  protected keyId = process.env.REACT_APP_ALPACA_KEY_ID;
  protected secretKey = process.env.REACT_APP_ALPACA_SECRET_KEY;

  multiBars = marketData.multiBars;
  getNews = news.getNews;
  bars = marketData.bars;
  assetBySymbol = trader.assetBySymbol;
}
export default AlpacaClient;
