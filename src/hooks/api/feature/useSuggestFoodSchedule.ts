import { ILocation } from "src/Models/location.model";
import { useMutation } from "@tanstack/react-query";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import endpoints from "src/services/endpoints";
import rootApi, { predictApi } from "src/services/rootApi";
import { IFood } from "src/Models/food.model";

export type variables = {
  location: [number, number];
};
type response = {
  data: {
    scheduleFoods: {
      schedule: {
        from: IFood;
        to: IFood;
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
const useSuggestFoodSchedule = () => {
  const {
    isLoading,
    isError,
    data,
    error,
    mutateAsync: onSuggestFoodSchedule,
  } = useMutation({
    mutationFn: (variables: variables) => {
      return rootApi.post<variables, response>(
        endpoints.SUGGEST_FOOD_SCHEDULE,
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
    onSuggestFoodSchedule,
  };
};

export default useSuggestFoodSchedule;
