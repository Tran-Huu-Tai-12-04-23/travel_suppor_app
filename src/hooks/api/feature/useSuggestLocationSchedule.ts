import { ILocation } from "src/Models/location.model";
import { useMutation } from "@tanstack/react-query";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import endpoints from "src/services/endpoints";
import rootApi, { predictApi } from "src/services/rootApi";

export type variables = {
  location: [number, number];
};
type response = {
  data: {
    scheduleLocations: {
      schedule: {
        from: ILocation;
        to: ILocation;
        distance: {
          distanceInKilometers: {
            value: number;
            text: string;
          };
          estimateTime: {
            value: number;
            text: string;
          };
        };
      }[];
      totalDistances: number;
    };
    meta: [number, number]; //[long, la]
  };
};
const useSuggestLocationSchedule = () => {
  const {
    isLoading,
    isError,
    data,
    error,
    mutateAsync: onSuggestLocationSchedule,
  } = useMutation({
    mutationFn: (variables: variables) => {
      return rootApi.post<variables, response>(
        endpoints.SUGGEST_LOCATION_SCHEDULE,
        variables,
        {}
      );
    },
    onError: (e: any) => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: e?.response?.data?.message || "Has error, ...",
      });
    },
    onSuccess: (data) => {},
  });

  return {
    data: data?.data ?? null,
    isLoading: isLoading,
    error: error,
    onSuggestLocationSchedule,
  };
};

export default useSuggestLocationSchedule;
