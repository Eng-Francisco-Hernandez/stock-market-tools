import endOfDay from "./end-of-day";

export class TiingoClient {
  protected token = process.env.REACT_APP_TIINGO_API_KEY!;

  protected baseUrl =
    "https://cors-anywhere.herokuapp.com/https://api.tiingo.com";

  getStockPrice = endOfDay.getStockPrice;
}
export default TiingoClient;
