export interface ILocation {
   id: string;
   name: string;
   coordinates: number[];
   lstImgs: string[];
   address: string | undefined;
   description: string | undefined;
   createdAt: Date;
   distanceInfo?: { distanceInKilometers: number; distanceInMeters: number };
}
