import { CurveType } from "recharts/types/shape/Curve";

import { BarObject } from "../../util-types";

export interface GraphSettings {
  symbol: string;
  title: string;
  data: BarObject[];
  strokeWidth: number;
  type: CurveType;
  dataKey: string;
  stroke: string;
  fill: string;
}
