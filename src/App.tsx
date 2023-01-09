import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { Route, Routes } from "react-router-dom";

import { Landing } from "./pages";
import { ROUTES } from "./util-routes/routes";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    // <ThemeProvider theme={darkTheme}>
    //   <CssBaseline />
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        {ROUTES.map((r, key) => (
          <Route key={key} {...r} />
        ))}
      </Routes>
    </div>
    // </ThemeProvider>
  );
}

export default App;
