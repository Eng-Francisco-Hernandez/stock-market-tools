import BadgeIcon from "@mui/icons-material/Badge";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import InventoryIcon from "@mui/icons-material/Inventory";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SearchIcon from "@mui/icons-material/Search";
import TagIcon from "@mui/icons-material/Tag";
import {
  Alert,
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  OutlinedInput,
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

import { CustomItemContainer, GraphTooltip } from "../../components";
import { AlpacaClient } from "../../financial-market";
import { Asset, BarObject, GraphSettings } from "../../util-types";
import { SidebarLayout } from "../shared";
import "./symbol.scss";

export default function Symbol() {
  const alpacaClient = new AlpacaClient();
  const [currentSymbol, setCurrentSymbol] = useState("TSLA");
  const [symbolInformation, setSymbolInformation] = useState<Asset>();
  const [symbolHistoricalData, setSymbolHistoricalData] = useState<BarObject[]>(
    []
  );
  const [showInvalidSymbol, setShowInvalidSymbol] = useState(false);
  const [symbolInfoLoading, setSymbolInfoLoading] = useState(false);

  useEffect(() => {
    async function setInitialData() {
      setSymbolInfoLoading(true);
      const symbolInfo = await alpacaClient.assetBySymbol(currentSymbol);
      setSymbolInformation(symbolInfo);
      const today = new Date();
      const endDate = new Date(today.setDate(today.getDate() - 2))
        .toISOString()
        .split("T")[0];
      const startDate = new Date(today.setDate(today.getDate() - 180))
        .toISOString()
        .split("T")[0];
      const symbolData = await alpacaClient.bars(
        currentSymbol,
        startDate,
        endDate,
        "1Day"
      );
      setSymbolHistoricalData(symbolData.bars);
      setSymbolInfoLoading(false);
    }
    setInitialData();
  }, []);

  const searchSymbol = async () => {
    if (showInvalidSymbol) setShowInvalidSymbol(false);
    setSymbolInfoLoading(true);
    try {
      const symbolInfo = await alpacaClient.assetBySymbol(currentSymbol);
      setSymbolInformation(symbolInfo);
      const today = new Date();
      const endDate = new Date(today.setDate(today.getDate() - 2))
        .toISOString()
        .split("T")[0];
      const startDate = new Date(today.setDate(today.getDate() - 180))
        .toISOString()
        .split("T")[0];
      const symbolData = await alpacaClient.bars(
        currentSymbol,
        startDate,
        endDate,
        "1Day"
      );
      setSymbolHistoricalData(symbolData.bars);
      setSymbolInfoLoading(false);
    } catch (error) {
      setSymbolInfoLoading(false);
      setShowInvalidSymbol(true);
      return;
    }
  };

  const BarObject: GraphSettings = {
    symbol: symbolInformation ? symbolInformation.symbol : "",
    title: symbolInformation ? symbolInformation.name : "",
    data: symbolHistoricalData,
    strokeWidth: 2,
    type: "monotone",
    dataKey: "c",
    stroke: "#37c16c",
    fill: "#309c5e",
  };

  return (
    <SidebarLayout title="Symbol">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-symbol">
              Search for a symbol
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
              label="Search for a symbol"
            />
          </FormControl>
        </Grid>
        {!showInvalidSymbol ? (
          <>
            {!symbolInfoLoading ? (
              <>
                <Grid item xs={8}>
                  <CustomItemContainer>
                    <div className="graph-title-container">
                      <Typography
                        variant="h6"
                        color="darkgreen"
                        className="mr-sm"
                      >
                        {BarObject.title}
                      </Typography>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
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
                        <CartesianGrid
                          strokeDasharray="3 3"
                          horizontal={false}
                        />
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
                    </ResponsiveContainer>
                  </CustomItemContainer>
                </Grid>
                <Grid item xs={4}>
                  <Card>
                    <CardContent>
                      <List>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <BadgeIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={symbolInformation?.name}
                            secondary="Name"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <InventoryIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={symbolInformation?.symbol}
                            secondary="Symbol"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <CurrencyExchangeIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={symbolInformation?.exchange}
                            secondary="Exchange"
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5" component="div">
                    Latest Information Available
                  </Typography>
                </Grid>
                {symbolHistoricalData.length ? (
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Grid item xs={12}>
                          <Typography variant="h5" component="div">
                            {`Date: ${symbolHistoricalData[
                              symbolHistoricalData.length - 1
                            ].t.substring(0, 10)}`}
                          </Typography>
                        </Grid>
                        <List>
                          <Grid container spacing={2}>
                            <Grid item xs={4}>
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <MonetizationOnIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    symbolHistoricalData[
                                      symbolHistoricalData.length - 1
                                    ].o
                                  }
                                  secondary="Open Price"
                                />
                              </ListItem>
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <MonetizationOnIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    symbolHistoricalData[
                                      symbolHistoricalData.length - 1
                                    ].h
                                  }
                                  secondary="High Price"
                                />
                              </ListItem>
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <MonetizationOnIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    symbolHistoricalData[
                                      symbolHistoricalData.length - 1
                                    ].l
                                  }
                                  secondary="Low Price"
                                />
                              </ListItem>
                            </Grid>
                            <Grid item xs={4}>
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <MonetizationOnIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    symbolHistoricalData[
                                      symbolHistoricalData.length - 1
                                    ].c
                                  }
                                  secondary="Close Price"
                                />
                              </ListItem>
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <TagIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    symbolHistoricalData[
                                      symbolHistoricalData.length - 1
                                    ].v
                                  }
                                  secondary="Volume"
                                />
                              </ListItem>
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <TagIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    symbolHistoricalData[
                                      symbolHistoricalData.length - 1
                                    ].n
                                  }
                                  secondary="Number Of Trades"
                                />
                              </ListItem>
                            </Grid>
                            <Grid item xs={4}>
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <TagIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    symbolHistoricalData[
                                      symbolHistoricalData.length - 1
                                    ].vw
                                  }
                                  secondary="Volume-weighted Average Price"
                                />
                              </ListItem>
                            </Grid>
                          </Grid>
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <Grid item xs={12}>
                <div className="centered-item">
                  <CircularProgress color="success" />
                </div>
              </Grid>
            )}
          </>
        ) : (
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
