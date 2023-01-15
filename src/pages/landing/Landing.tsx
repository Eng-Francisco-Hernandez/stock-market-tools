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
    async function fetchTickerData(
      sinceDate: string,
      ticker: string
    ): Promise<GraphItem[]> {
      const tingoclient = new TiingoClient();
      const response = await tingoclient.getStockPrice(sinceDate, ticker);
      return response;
    }
    async function setGraphsData() {
      setLandingGraphsLoading(true);
      const today = new Date();
      const startingDate = new Date(today.setDate(today.getDate() - 180));
      const strStartingDate = startingDate.toISOString().split("T")[0];
      const data = {
        spy: await fetchTickerData(strStartingDate, "spy"),
        qqq: await fetchTickerData(strStartingDate, "qqq"),
        dia: await fetchTickerData(strStartingDate, "dia"),
      };
      setLandingGraphsData(data);
      setLandingGraphsLoading(false);
    }
    setGraphsData();
  }, []);

  const graphItems: GraphSettings[] = [
    {
      data: landingGraphsData.spy,
      strokeWidth: 2,
      type: "monotone",
      dataKey: "close",
      stroke: "#37c16c",
      fill: "#309c5e",
    },
    {
      data: landingGraphsData.qqq,
      strokeWidth: 2,
      type: "monotone",
      dataKey: "close",
      stroke: "#37c16c",
      fill: "#309c5e",
    },
    {
      data: landingGraphsData.dia,
      strokeWidth: 2,
      type: "monotone",
      dataKey: "close",
      stroke: "#37c16c",
      fill: "#309c5e",
    },
  ];

  return (
    <SidebarLayout title="Landing page">
      <Grid container spacing={2}>
        {graphItems.map((graphItem) => {
          return (
            <Grid item xs={4}>
              <ResponsiveContainer width="100%" height={200}>
                {!landingGraphsLoading ? (
                  <AreaChart
                    data={graphItem.data}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <YAxis type="number" domain={["dataMin", "dataMax"]} hide />
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
                  <CircularProgress color="success" className="centered-item" />
                )}
              </ResponsiveContainer>
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
