import axios from "axios";

import AlpacaClient from "./alpaca-client";

const marketData = {
  multiBars: async function (
    this: AlpacaClient,
    symbols: string[],
    startDate: string,
    endDate: string,
    timeFrame: string
  ) {
    const headers = {
      "Apca-Api-Key-Id": this.keyId,
      "Apca-Api-Secret-Key": this.secretKey,
    };
    const options = {
      headers: headers,
    };
    const response = await axios.get(
      `${this.marketsHost}/v2/stocks/bars?symbols=${symbols.join(
        ","
      )}&start=${startDate}&end=${endDate}&timeframe=${timeFrame}`,
      options
    );
    const data = response.data;
    return data;
  },
};

export default marketData;
