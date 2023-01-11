import TiingoClient from "./tiingo-client";

const endOfDay = {
  getStockPrice: async function (
    this: TiingoClient,
    startDate: string,
    ticker: string
  ) {
    const headers = {
      Authorization: `Token ${this.token}`,
    };
    const response = await fetch(
      `${this.baseUrl}/tiingo/daily/${ticker}/prices?startDate=${startDate}`,
      {
        method: "GET",
        headers: headers,
      }
    );
    const data = await response.json();
    return data;
  },
};

export default endOfDay;
