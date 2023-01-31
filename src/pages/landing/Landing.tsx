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
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip as MainGraphTooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";

import newsImagePlaceholder from "../../assets/images/money-banner-placeholder.jpg";
import { CustomItemContainer, GraphTooltip } from "../../components";
import { AlpacaClient } from "../../financial-market";
import { graphsDescriptions } from "../../util-constants";
import { BarObject, GraphSettings, NewsItem } from "../../util-types";
import { SidebarLayout } from "../shared";

import "./landing.scss";

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
      symbol: "SPY",
      title: "S&P 500",
      data: landingGraphsData.SPY,
      strokeWidth: 2,
      type: "monotone",
      dataKey: "c",
      stroke: "#37c16c",
      fill: "#309c5e",
    },
    {
      symbol: "QQQ",
      title: "QQQ",
      data: landingGraphsData.QQQ,
      strokeWidth: 2,
      type: "monotone",
      dataKey: "c",
      stroke: "#37c16c",
      fill: "#309c5e",
    },
    {
      symbol: "DIA",
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
              <CustomItemContainer>
                <div className="graph-title-container">
                  <Typography variant="h6" color="darkgreen" className="mr-sm">
                    {BarObject.title}
                  </Typography>
                  <Tooltip
                    title={graphsDescriptions[BarObject.symbol]}
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
              </CustomItemContainer>
            </Grid>
          );
        })}
        <Grid item xs={12}>
          <Typography variant="h5" component="div">
            Latest news
          </Typography>
        </Grid>
        {latestNews.map((newsItem, i) => {
          return (
            <Grid key={i} item xs={6} container alignItems="stretch">
              {!newsLoading ? (
                <Card sx={{ width: "100%" }}>
                  <CardMedia
                    sx={{ height: 150 }}
                    image={
                      newsItem.images.length
                        ? newsItem.images[0].url
                        : newsImagePlaceholder
                    }
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
