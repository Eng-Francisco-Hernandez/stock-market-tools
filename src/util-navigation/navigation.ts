export type RouteNavigationType = {
  element: string;
  path: string;
};

export const Navigation: { [key: string]: RouteNavigationType } = {
  LANDING: {
    element: "Landing",
    path: "/landing",
  },
  SYMBOL: {
    element: "Symbol",
    path: "/symbol",
  },
};
