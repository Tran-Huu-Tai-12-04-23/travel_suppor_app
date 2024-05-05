export interface IFood {
   id: string;
   name: string;
   coordinates: number[];
   lstImgs: string[];
   address: string | undefined;
   description: string | undefined;
   rangePrice: number[];
   createdAt: Date;
   distanceInfo?: { distanceInKilometers: number; distanceInMeters: number };
}
