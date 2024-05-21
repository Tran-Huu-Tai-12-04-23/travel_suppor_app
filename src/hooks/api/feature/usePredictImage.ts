import { ILocation } from "src/Models/location.model";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ALERT_TYPE,
  AlertNotificationDialog,
  AlertNotificationToast,
  Toast,
} from "react-native-alert-notification";
import { IFood } from "src/Models/food.model";
import endpoints from "src/services/endpoints";
import rootApi, { predictApi } from "src/services/rootApi";
import { useModal } from "@context/ModalContext";

export type variables = {
  image_url: string;
  location?: [number, number];
};
type response = {
  data: {
    location: ILocation | null;
    food: IFood | null;
    meta: [number, number] | null; // user location
  };
};
const usePredictImage = () => {
  const { hideModal } = useModal();
  const {
    isLoading,
    isError,
    data,
    error,
    mutateAsync: onPredict,
  } = useMutation({
    mutationFn: (variables: variables) => {
      return rootApi.post<variables, response>(
        endpoints.PREDICT_IMG,
        variables,
        {}
      );
    },
    onError: (e: any) => {
      hideModal();
      AlertNotificationDialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody:
          e?.response?.data?.message ||
          "Can not predict image, Try again with another image",
      });
    },
    onSuccess: (data) => {},
  });

  return {
    data: data?.data ?? null,
    isLoading: isLoading,
    error: error,
    onPredict,
  };
};

export default usePredictImage;
