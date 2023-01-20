import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip as MainGraphTooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";

import { GraphTooltip } from "../../components";
import { AlpacaClient, TiingoClient } from "../../financial-market";
import { graphsDescriptions } from "../../util-constants";
import { BarObject, GraphSettings, NewsItem } from "../../util-types";
import { SidebarLayout } from "../shared";

import "./landing.scss";

const GraphContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
}));

export default function Landing() {
  const alpacaClient = new AlpacaClient();
  const [landingGraphsData, setLandingGraphsData] = useState<{
    SPY: BarObject[];
    QQQ: BarObject[];
    DIA: BarObject[];
  }>({
    SPY: [],
    QQQ: [],
    DIA: [],
  });
  const [landingGraphsLoading, setLandingGraphsLoading] = useState(false);
  const [newsLoading, setNewsLoading] = useState(false);
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    async function setInitialData() {
      setLandingGraphsLoading(true);
      const today = new Date();
      const endDate = new Date(today.setDate(today.getDate() - 2))
        .toISOString()
        .split("T")[0];
      const startDate = new Date(today.setDate(today.getDate() - 180))
        .toISOString()
        .split("T")[0];
      const graphsData = await alpacaClient.multiBars(
        ["SPY", "QQQ", "DIA"],
        startDate,
        endDate,
        "1Day"
      );
      setLandingGraphsLoading(false);
      setLandingGraphsData(graphsData.bars);
      setNewsLoading(true);
      const newsData = await alpacaClient.getNews(startDate, endDate, 6);
      setLatestNews(newsData.news);
      setNewsLoading(false);
    }
    setInitialData();
  }, []);

  const BarObjects: GraphSettings[] = [
    {
      ticker: "SPY",
      title: "S&P 500",
      data: landingGraphsData.SPY,
      strokeWidth: 2,
      type: "monotone",
      dataKey: "c",
      stroke: "#37c16c",
      fill: "#309c5e",
    },
    {
      ticker: "QQQ",
      title: "QQQ",
      data: landingGraphsData.QQQ,
      strokeWidth: 2,
      type: "monotone",
      dataKey: "c",
      stroke: "#37c16c",
      fill: "#309c5e",
    },
    {
      ticker: "DIA",
      title: "DOW",
      data: landingGraphsData.DIA,
      strokeWidth: 2,
      type: "monotone",
      dataKey: "c",
      stroke: "#37c16c",
      fill: "#309c5e",
    },
  ];

  return (
    <SidebarLayout title="Stock Market Tools">
      <Grid container spacing={2}>
        {BarObjects.map((BarObject, i) => {
          return (
            <Grid key={i} item xs={4}>
              <GraphContainer>
                <div className="graph-title-container">
                  <Typography variant="h6" color="darkgreen" className="mr-sm">
                    {BarObject.title}
                  </Typography>
                  <Tooltip
                    title={graphsDescriptions[BarObject.ticker]}
                    placement="bottom"
                    arrow
                  >
                    <IconButton
                      size="small"
                      aria-label="delete"
                      color="primary"
                    >
                      <HelpOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  {!landingGraphsLoading ? (
                    <AreaChart
                      data={BarObject.data}
                      margin={{
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <defs>
                        <linearGradient
                          id={`color${BarObject.dataKey}`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#82ca9d"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#82ca9d"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <YAxis
                        type="number"
                        domain={["dataMin", "dataMax"]}
                        hide
                      />
                      <MainGraphTooltip content={<GraphTooltip />} />
                      <Area
                        strokeWidth={BarObject.strokeWidth}
                        type={BarObject.type}
                        dataKey={BarObject.dataKey}
                        stroke={BarObject.stroke}
                        fill={`url(#${`color${BarObject.dataKey}`})`}
                      />
                    </AreaChart>
                  ) : (
                    <div className="centered-item">
                      <CircularProgress color="success" />
                    </div>
                  )}
                </ResponsiveContainer>
              </GraphContainer>
            </Grid>
          );
        })}
        {latestNews.map((newsItem, i) => {
          return (
            <Grid key={i} item xs={6} container alignItems="stretch">
              {!newsLoading ? (
                <Card>
                  <CardMedia
                    sx={{ height: 150 }}
                    image={newsItem.images[0].url}
                    title="news image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {newsItem.headline}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {newsItem.summary}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href={newsItem.url} target="_blank">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              ) : (
                <div className="centered-item">
                  <CircularProgress color="success" />
                </div>
              )}
            </Grid>
          );
        })}
      </Grid>
    </SidebarLayout>
  );
}
