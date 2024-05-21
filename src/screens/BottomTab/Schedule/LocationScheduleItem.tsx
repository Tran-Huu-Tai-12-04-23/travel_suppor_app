import ButtonCustom from "@components/ButtonCustom";
import ImageCustom from "@components/ImageCustom";
import Row from "@components/Row";
import Separator from "@components/Separator";
import TextDefault from "@components/TextDefault";
import { hightLightColor } from "@constants/Colors";
import { deviceWidth } from "@helper/utils";
import { navigate } from "@navigation/NavigationService";
import { ROUTE_KEY } from "@navigation/route";
import React, { useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { ILocation } from "src/Models/location.model";

function LocationScheduleItem({
  data,
}: {
  data: {
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
  };
}) {
  const { from, to, distance } = data;

  const thumbnails = useCallback(() => {
    return to?.lstImgs?.length > 0 ? to.lstImgs[0] : "  ";
  }, [to]);
  return (
    <Row start direction="column" style={[{ borderRadius: 30 }]}>
      <TouchableOpacity onPress={() => {}}>
        <ImageCustom
          link={thumbnails()}
          style={{ borderRadius: 10, width: deviceWidth - 80, height: 120 }}
        />
      </TouchableOpacity>
      <Row start full direction="column" style={{ overflow: "hidden" }}>
        <TextDefault
          bold
          style={{ fontSize: 18, width: "70%", overflow: "hidden" }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {to?.name}
        </TextDefault>
        <Row
          direction="column"
          style={{ width: "70%", overflow: "hidden" }}
          start
          colGap={4}
        >
          <TextDefault numberOfLines={1} ellipsizeMode="tail">
            {to?.address}
          </TextDefault>

          <Row colGap={20}>
            <TextDefault bold>
              {distance && distance.distanceInKilometers?.text}
            </TextDefault>
            <TextDefault style={{ color: hightLightColor }} bold>
              {distance && distance.estimateTime?.text}
            </TextDefault>
          </Row>
        </Row>

        <Separator height={10} />
        <ButtonCustom
          mode="outlined"
          style={{ paddingHorizontal: 30 }}
          onPress={() =>
            navigate(ROUTE_KEY.DIRECTION, {
              desLocation: to.coordinates.coordinates,
            })
          }
          title={"Director"}
        />
        <Separator height={10} />
      </Row>
    </Row>
  );
}

export default LocationScheduleItem;
