import * as React from "react";

import { Landing, News, Symbol } from "../pages";
import { Navigation } from "../util-navigation/navigation";

const routeComponents: { [key: string]: React.ReactNode } = {
  Landing: <Landing />,
  Symbol: <Symbol />,
  News: <News />,
};

export type RouteNavigationType = {
  element: React.ReactNode;
  path: string;
};

export const ROUTES: Array<RouteNavigationType> = Object.keys(
  Navigation
).reduce(
  (sum: Array<RouteNavigationType>, k) => [
    ...sum,
    {
      ...Navigation[k],
      element: routeComponents[Navigation[k].element],
    },
  ],
  []
);
