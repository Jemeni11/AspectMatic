export type OptionsObject<T extends Separator | RatioForm> = {
  title: T;
  subtitle: string;
};

export type Separator = "Colon" | "Slash";

export type RatioForm = "Regular Ratio" | "Reduced Ratio" | "Decimal";

export type AspectRatio = {
  nodeName: string;
  width: number;
  height: number;
};
