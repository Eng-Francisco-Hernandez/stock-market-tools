import axios from "axios";

import AlpacaClient from "./alpaca-client";

const trader = {
  assetBySymbol: async function (this: AlpacaClient, symbol: string) {
    const headers = {
      "Apca-Api-Key-Id": this.keyId,
      "Apca-Api-Secret-Key": this.secretKey,
    };
    const options = {
      headers: headers,
    };
    const response = await axios.get(
      `${this.traderHost}/v2/assets/${symbol}`,
      options
    );
    const data = response.data;
    if (data.code) throw new Error("Invalid symbol!");
    return data;
  },
};

export default trader;
