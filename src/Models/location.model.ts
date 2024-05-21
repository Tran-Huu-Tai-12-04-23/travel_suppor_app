export interface ILocation {
  _id: string;
  id: string;
  label: string;
  name: string;
  coordinates: {
    type: string;
    coordinates: number[];
  };
  lstImgs: string[];
  address: string | undefined;
  description: string | undefined;
  createdAt: Date;
  distanceInfo?: {
    distanceInKilometers: number;
    estimateTime: number;
  } | null;
}
