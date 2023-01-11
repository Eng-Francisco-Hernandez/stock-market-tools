import endOfDay from "./end-of-day";

export class TiingoClient {
  protected token: string;

  protected baseUrl = "https://api.tiingo.com";

  constructor(token: string) {
    this.token = token;
  }

  getStockPrice = endOfDay.getStockPrice;
}
export default TiingoClient;
