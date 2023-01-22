import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import newsImagePlaceholder from "../../assets/images/money-banner-placeholder.jpg";
import { AlpacaClient } from "../../financial-market";
import { NewsItem } from "../../util-types";
import { SidebarLayout } from "../shared";

export default function News() {
  const alpacaClient = new AlpacaClient();
  const [currentSymbol, setCurrentSymbol] = useState("MSFT");
  const [showInvalidSymbol, setShowInvalidSymbol] = useState(false);
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);

  useEffect(() => {
    async function setInitialData() {
      setNewsLoading(true);
      const today = new Date();
      const endDate = new Date(today.setDate(today.getDate() - 2))
        .toISOString()
        .split("T")[0];
      const startDate = new Date(today.setDate(today.getDate() - 180))
        .toISOString()
        .split("T")[0];
      const newsData = await alpacaClient.getNews(startDate, endDate, 6, [
        currentSymbol,
      ]);
      setLatestNews(newsData.news);
      setNewsLoading(false);
    }
    setInitialData();
  }, []);

  const searchSymbol = async () => {
    if (showInvalidSymbol) setShowInvalidSymbol(false);
    setNewsLoading(true);
    try {
      const symbolInfo = await alpacaClient.assetBySymbol(currentSymbol);
      const today = new Date();
      const endDate = new Date(today.setDate(today.getDate() - 2))
        .toISOString()
        .split("T")[0];
      const startDate = new Date(today.setDate(today.getDate() - 180))
        .toISOString()
        .split("T")[0];
      const newsData = await alpacaClient.getNews(startDate, endDate, 6, [
        currentSymbol,
      ]);
      setLatestNews(newsData.news);
      setNewsLoading(false);
    } catch (error) {
      setNewsLoading(false);
      setShowInvalidSymbol(true);
      return;
    }
  };

  return (
    <SidebarLayout title="News">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-symbol">
              Enter a symbol to search for news related
            </InputLabel>
            <OutlinedInput
              value={currentSymbol}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCurrentSymbol(event.target.value.trim().toUpperCase());
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  searchSymbol();
                }
              }}
              id="outlined-symbol"
              type="text"
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={searchSymbol}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              label="Enter a symbol to search for news related"
            />
          </FormControl>
        </Grid>
        {!showInvalidSymbol &&
          latestNews.map((newsItem, i) => {
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
                      <Typography variant="body2" color="text.secondary">
                        {`${newsItem.author}, ${newsItem.created_at.substring(
                          0,
                          10
                        )}`}
                      </Typography>
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
        {showInvalidSymbol && (
          <Grid item xs={12}>
            <div className="centered-item">
              <Alert severity="error">
                Error: Invalid Symbol, please make sure the symbol you are
                searching for is valid.
              </Alert>
            </div>
          </Grid>
        )}
      </Grid>
    </SidebarLayout>
  );
}
