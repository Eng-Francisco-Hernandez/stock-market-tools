import marketData from "./market-data";
import news from "./news";

export class AlpacaClient {
  protected marketsHost = process.env.REACT_APP_ALPACA_MARKETS_HOST;
  protected keyId = process.env.REACT_APP_ALPACA_KEY_ID;
  protected secretKey = process.env.REACT_APP_ALPACA_SECRET_KEY;

  multiBars = marketData.multiBars;
  getNews = news.getNews;
}
export default AlpacaClient;
