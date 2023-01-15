import axios from "axios";

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
    const options = {
      headers: headers,
    };
    const response = await axios.get(
      `${this.baseUrl}/tiingo/daily/${ticker}/prices?startDate=${startDate}`,
      options
    );
    const data = response.data;
    return data;
  },
};

export default endOfDay;
