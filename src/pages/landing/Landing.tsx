import { CircularProgress, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";
import { CurveType } from "recharts/types/shape/Curve";

import { TiingoClient } from "../../financial-market";
import { SidebarLayout } from "../shared";
import * as data from "./mocked-data.json";

import "./landing.scss";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
}));

export interface GraphItem {
  date: Date;
  close: number;
  high: number;
  low: number;
  open: number;
  volume: number;
  adjClose: number;
  adjHigh: number;
  adjLow: number;
  adjOpen: number;
  adjVolume: number;
  divCash: number;
  splitFactor: number;
}

interface GraphSettings {
  title: string;
  data: GraphItem[];
  strokeWidth: number;
  type: CurveType;
  dataKey: string;
  stroke: string;
  fill: string;
}

export default function Landing() {
  const [landingGraphsData, setLandingGraphsData] = useState<{
    spy: GraphItem[];
    qqq: GraphItem[];
    dia: GraphItem[];
  }>({
    spy: [],
    qqq: [],
    dia: [],
  });

  const [landingGraphsLoading, setLandingGraphsLoading] = useState(false);

  useEffect(() => {
    // async function fetchTickerData(
    //   sinceDate: string,
    //   ticker: string
    // ): Promise<GraphItem[]> {
    //   const tingoclient = new TiingoClient();
    //   const response = await tingoclient.getStockPrice(sinceDate, ticker);
    //   return response;
    // }
    // async function setGraphsData() {
    //   setLandingGraphsLoading(true);
    //   const today = new Date();
    //   const startingDate = new Date(today.setDate(today.getDate() - 180));
    //   const strStartingDate = startingDate.toISOString().split("T")[0];
    //   const data = {
    //     spy: await fetchTickerData(strStartingDate, "spy"),
    //     qqq: await fetchTickerData(strStartingDate, "qqq"),
    //     dia: await fetchTickerData(strStartingDate, "dia"),
    //   };
    //   setLandingGraphsData(data);
    //   setLandingGraphsLoading(false);
    // }
    // setGraphsData();
    setLandingGraphsData(data as any);
  }, []);

  const graphItems: GraphSettings[] = [
    {
      title: "S&P 500",
      data: landingGraphsData.spy,
      strokeWidth: 2,
      type: "monotone",
      dataKey: "close",
      stroke: "#37c16c",
      fill: "#309c5e",
    },
    {
      title: "QQQ",
      data: landingGraphsData.qqq,
      strokeWidth: 2,
      type: "monotone",
      dataKey: "close",
      stroke: "#37c16c",
      fill: "#309c5e",
    },
    {
      title: "DOW",
      data: landingGraphsData.dia,
      strokeWidth: 2,
      type: "monotone",
      dataKey: "close",
      stroke: "#37c16c",
      fill: "#309c5e",
    },
  ];

  return (
    <SidebarLayout title="Stock Market Tools">
      <Grid container spacing={2}>
        {graphItems.map((graphItem, i) => {
          return (
            <Grid key={i} item xs={4}>
              <Item>
                <div>{graphItem.title}</div>
                <ResponsiveContainer width="100%" height={200}>
                  {!landingGraphsLoading ? (
                    <AreaChart
                      data={graphItem.data}
                      margin={{
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <YAxis
                        type="number"
                        domain={["dataMin", "dataMax"]}
                        hide
                      />
                      <Tooltip />
                      <Area
                        strokeWidth={graphItem.strokeWidth}
                        type={graphItem.type}
                        dataKey={graphItem.dataKey}
                        stroke={graphItem.stroke}
                        fill={graphItem.fill}
                      />
                    </AreaChart>
                  ) : (
                    <CircularProgress
                      color="success"
                      className="centered-item"
                    />
                  )}
                </ResponsiveContainer>
              </Item>
            </Grid>
          );
        })}
        <Grid item xs={12}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </SidebarLayout>
  );
}
