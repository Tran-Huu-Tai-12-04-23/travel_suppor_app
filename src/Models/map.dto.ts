interface Location {
   lat: number;
   lng: number;
}

interface Distance {
   text: string;
   value: number;
}

interface Duration {
   text: string;
   value: number;
}

interface Step {
   distance: Distance;
   duration: Duration;
   end_location: Location;
   html_instructions: string;
   polyline: { points: string };
   start_location: Location;
   steps?: Step[]; // Optional nested steps
   travel_mode: string;
   transit_details?: TransitDetails; // Only present for 'TRANSIT' mode
}

interface TransitDetails {
   arrival_stop: Location;
   arrival_time: { text: string; time_zone: string; value: number };
   departure_stop: Location;
   departure_time: { text: string; time_zone: string; value: number };
   headsign: string;
   headway: number;
   line: {
      agencies: { name: string; url: string }[];
      color: string;
      name: string;
      short_name: string;
      text_color: string;
      vehicle: { icon: string; name: string; type: string };
   };
   num_stops: number;
}

interface Route {
   distance: Distance;
   duration: Duration;
   end_location: Location;
   html_instructions: string;
   polyline: { points: string };
   start_location: Location;
   steps: Step[];
   travel_mode: string;
   transit_details?: TransitDetails;
}
export type DirectionsData = Route[];
