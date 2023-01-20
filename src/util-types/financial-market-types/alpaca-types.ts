export interface BarObject {
  t: Date;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  n: number;
  vw: number;
}

export interface NewsItem {
  author: string;
  content: string;
  created_at: string;
  headline: string;
  id: number;
  images: Image[];
  source: string;
  summary: string;
  symbols: string[];
  updated_at: string;
  url: string;
}

export interface Image {
  size: string;
  url: string;
}
