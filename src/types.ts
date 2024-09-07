export type OptionsObject<T extends Separator | RatioForm> = {
  title: T;
  subtitle: string;
};

export type Separator = "Colon" | "Slash";

export type RatioForm =
  | "Regular Ratio"
  | "Reduced Ratio"
  | "Decimal"
  | "Rounded Decimal";

export type AspectRatio = {
  nodeName: string;
  width: number;
  height: number;
};

export type AllAspectRatioFormats = {
  "Regular Ratio": {
    Colon: string;
    Slash: string;
  };
  "Reduced Ratio": {
    Colon: string;
    Slash: string;
  };
  Decimal: string;
  "Rounded Decimal": string;
};

export type AspectRatioWithFormats = AspectRatio & AllAspectRatioFormats;
