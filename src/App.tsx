import { amber, grey } from "@mui/material/colors";
import green from "@mui/material/colors/green";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { Route, Routes } from "react-router-dom";

import { Landing } from "./pages";
import { ROUTES } from "./util-routes/routes";

const customTheme = createTheme({
  palette: {
    // mode: "dark",
    primary: {
      main: "#2b884f",
      light: "#c5edd4",
      dark: "#1e6138",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          {ROUTES.map((r, key) => (
            <Route key={key} {...r} />
          ))}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
