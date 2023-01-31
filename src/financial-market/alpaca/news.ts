import axios from "axios";

import AlpacaClient from "./alpaca-client";

const news = {
  getNews: async function (
    this: AlpacaClient,
    startDate: string,
    endDate: string,
    limit = 5,
    symbols: string[] = []
  ) {
    const headers = {
      "Apca-Api-Key-Id": this.keyId,
      "Apca-Api-Secret-Key": this.secretKey,
    };
    const options = {
      headers: headers,
    };
    let formattedSymbols = "";
    if (symbols.length) {
      formattedSymbols = `&symbols=${symbols.join(",")}`;
    }
    const response = await axios.get(
      `${this.marketsHost}/v1beta1/news?start=${startDate}&end=${endDate}&limit=${limit}${formattedSymbols}`,
      options
    );
    const data = response.data;
    return data;
  },
};

export default news;
