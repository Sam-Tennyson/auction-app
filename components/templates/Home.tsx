import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  useColorScheme,
} from "react-native";
import React from "react";
import { Text, View } from "../Themed";
import { useFetchHomeCollection } from "@/hooks/useHomePage";
import { CLOUDFRONT_URL } from "@/api";
import RenderHTML from "react-native-render-html";
import Colors from "@/constants/Colors";
import CustomCarousel from "../atoms/CustomCarousel";
import { ICategoryCollection } from "@/types";
import { getImageCloudfrontUrl } from "@/shareds/utilies";
import { Stack } from "expo-router";
import SearchComponent from "../atoms/SearchComponent";

const { width: screenWidth } = Dimensions.get("window");
const COUNT = 2;
const Home = () => {
  const { data: dataCarousel, fetchStatus } = useFetchHomeCollection();
  const theme = useColorScheme() ?? "light";
  const itemWidth = screenWidth / 3; // Adjust -10 for spacing/margin

  const baseOptions = {
    vertical: false,
    width: screenWidth / COUNT,
    // height: screenWidth / 2,
    height: 100,
    style: {
      width: screenWidth - 20,
    },
  } as const;

  if (fetchStatus === "fetching") {
    return (
      <ActivityIndicator color={Colors[theme].brandColor} style={{ flex: 1 }} />
    );
  }

  const renderItem = ({ item }: { item: any }) => {
    const imageUrl = getImageCloudfrontUrl(item);
    return (
      <View style={[styles.carouselItem, { width: itemWidth }]}>
        <Image
          resizeMode="contain"
          source={{ uri: imageUrl }}
          style={{ width: 65, height: 65, aspectRatio: 1 / 1 }}
        />
        <Text>{item.name}</Text>
      </View>
    );
  };

  const renderHomeCollection = () => {
    return (
      <View>
        {dataCarousel?.map((collection: ICategoryCollection, index: number) => {
          const { collectionData } = collection;
          return (
            <View style={styles.collectionContainer} key={index}>
              <Text style={styles.subTitle}>
                {collection?.subTitle?.toUpperCase()}
              </Text>
              <RenderHTML
                contentWidth={Dimensions.get("window").width}
                tagsStyles={{
                  span: {
                    fontSize: 20,
                    fontWeight: "bold",
                    alignSelf: "center",
                    color: Colors[theme].brandColor,
                  },
                  body: {
                    fontSize: 20,
                    alignSelf: "center",
                    color: Colors[theme].text,
                  },
                }}
                source={{ html: collection?.title }}
              />
              <Text>{collection?.description}</Text>
              <CustomCarousel
                data={collectionData}
                autoPlay={false}
                baseOptions={baseOptions}
                renderItem={renderItem}
              />
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.viewContainer}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,

          headerTitle: () => <SearchComponent />,
        }}
      />
      {renderHomeCollection()}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  viewContainer: {
    flexGrow: 1,
    flexDirection: "column",
    rowGap: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    aspectRatio: 16 / 9,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  subTitle: {
    fontSize: 20,
    alignSelf: "center",
  },
  collectionContainer: {
    rowGap: 15,
    flex: 1,
    flexGrow: 1,
    marginBottom: 20,
  },
  carouselItem: {
    // backgroundColor: "lightgrey",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    marginVertical: 25,
  },
});
