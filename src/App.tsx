import React from "react";
import { Route, Routes } from "react-router-dom";

import { Landing } from "./pages";
import { ROUTES } from "./util-routes/routes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        {ROUTES.map((r, key) => (
          <Route key={key} {...r} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
