import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";

import { Landing } from "./pages";
import { ROUTES } from "./util-routes/routes";
import "./theme/main.scss";

const customTheme = createTheme({
  palette: {
    // mode: "dark",
    primary: {
      main: "#2b884f",
      light: "#c5edd4",
      dark: "#1e6138",
    },
    text: {
      primary: "#1e6138",
      secondary: "#2b884f",
      disabled: "#c5edd4",
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
