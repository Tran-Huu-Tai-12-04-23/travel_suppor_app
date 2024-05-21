import ButtonCustom from "@components/ButtonCustom";
import Icon from "@components/Icon";
import Row from "@components/Row";
import Separator from "@components/Separator";
import TextDefault from "@components/TextDefault";
import TextInputCustom from "@components/TextInputCustom";
import { btnPrimary, primaryColor, whiteColor } from "@constants/Colors";
import MainLayout from "@layout/MainLayout";
import { goBack } from "@navigation/NavigationService";
import { localImages } from "assets/localImage";
import React, { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Chip } from "react-native-paper";
import { styleGlobal } from "src/styles";
import { debounce, head } from "lodash";
import LocationItem from "@components/LocationItem";
import { deviceWidth } from "@helper/utils";
import usePaginationSearch from "@hooks/api/feature/usePaginationSearch";
import FoodItem from "@components/FoodItem";

export enum SEARCH_TYPE {
  ALL = "ALL",
  FOOD = "FOOD",
  LOCATION = "LOCATION",
}

const filters = [
  {
    key: SEARCH_TYPE.ALL,
    name: "ALl",
    icon: null,
  },
  {
    key: SEARCH_TYPE.LOCATION,
    name: "Location",
    icon: <Icon link={localImages().locationIcon} style={{ height: 18 }} />,
  },
  {
    key: SEARCH_TYPE.FOOD,
    name: "Food",
    icon: <Icon link={localImages().foodIcon} style={{ height: 18 }} />,
  },
];

function SearchLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeSearch, setTypeSearch] = useState<SEARCH_TYPE>(SEARCH_TYPE.ALL);
  const debouncedOnChangeText = debounce((text: string) => {
    setIsLoading(false);
    setSearchQuery(text);
  }, 1000);

  const {
    data,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isLoading: isLoadingCallApi,
  } = usePaginationSearch({
    type: typeSearch,
    query: searchQuery,
    skip: 0,
    take: 10,
  });

  const handleTextChange = (text: string) => {
    setSearchQuery(text);
    setIsLoading(true);

    setTimeout(() => {
      debouncedOnChangeText(text);
    }, 500);
  };

  const _renderLocationItem = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => (
    <Row full key={index}>
      {item.type === SEARCH_TYPE.LOCATION && (
        <LocationItem key={index} width={deviceWidth - 40} data={item} />
      )}
      {item.type === SEARCH_TYPE.FOOD && (
        <FoodItem key={index} width={deviceWidth - 40} data={item} />
      )}
    </Row>
  );
  return (
    <MainLayout
      style={{
        background: whiteColor,
        paddingTop: 10,
        paddingBottom: 0,
        paddingHorizonTal: 10,
      }}
    >
      <Row between wrap colGap={20}>
        <TouchableOpacity
          onPress={goBack}
          style={[
            styleGlobal.shadowForce,
            styleGlobal.center,
            {
              maxWidth: 40,
              borderRadius: 100,
              backgroundColor: whiteColor,
              height: 40,
              width: 40,
              padding: 20,
            },
          ]}
        >
          <Icon
            link={localImages().arrBackIcon}
            style={{ width: 14, height: 14 }}
          />
        </TouchableOpacity>
        <TextInputCustom
          onChangeText={handleTextChange}
          flex={8}
          placeholder="Where do you go?"
        />
      </Row>

      <Separator height={10} />
      <Row style={{ padding: 10 }} colGap={20}>
        {filters.map((filter) => (
          <ButtonCustom
            mode="contained"
            primary={typeSearch === filter.key}
            startIcon={filter.icon}
            key={filter.key}
            onPress={() => setTypeSearch(filter.key)}
            title={filter.name}
          ></ButtonCustom>
        ))}
      </Row>
      {isLoading ||
        (isLoadingCallApi && (
          <Row direction="column" center style={{ padding: "10%" }} rowGap={20}>
            <TextDefault bold>Searching...</TextDefault>
            <ActivityIndicator color={btnPrimary} />
          </Row>
        ))}

      {!isLoading && !isLoadingCallApi && (
        <FlatList
          showsVerticalScrollIndicator={false}
          onRefresh={refetch}
          refreshing={isRefetching}
          onEndReached={() => fetchNextPage()}
          onEndReachedThreshold={0.2}
          scrollEventThrottle={2}
          ItemSeparatorComponent={() => <Separator height={20} />}
          ListFooterComponent={() =>
            hasNextPage ? (
              <ActivityIndicator color={primaryColor} />
            ) : (
              <Separator height={10} />
            )
          }
          ListEmptyComponent={() =>
            isLoading ? (
              <ActivityIndicator color={primaryColor} />
            ) : (
              <Row direction="column" full center>
                <TextDefault>No result</TextDefault>
              </Row>
            )
          }
          style={{ paddingTop: 10, padding: 10 }}
          data={data}
          renderItem={_renderLocationItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </MainLayout>
  );
}

export default SearchLocation;
