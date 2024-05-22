import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  useColorScheme,
} from "react-native";
import React from "react";
import { Text, View } from "../Themed";
import { useFetchHomeCollection } from "@/hooks/useHomePage";
import { ICategoryCollection } from "@/types";
import { CLOUDFRONT_URL } from "@/api";
import RenderHTML from "react-native-render-html";
import Colors from "@/constants/Colors";

const ShowCollectionData = (collection: any) => {
  console.log(collection, "check😊");
  return (
    <View>
      <FlatList
        horizontal={true}
        data={collection?.collection}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const imageUrl = `${CLOUDFRONT_URL}${item?.imageURL}`;
          return (
            <View key={index}>
              <Image
                resizeMode="cover"
                source={item?.imageURL ? { uri: imageUrl } : undefined}
                style={[styles.image, { backgroundColor: "#000" }]}
              />
              <Text>{item?.name}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const Home = () => {
  const { data: dataCarousel } = useFetchHomeCollection();
  const theme = useColorScheme() ?? "light";
  //   console.log(dataCarousel?.[0], "home");
  return (
    <View style={styles.viewContainer}>
      {dataCarousel?.map((collection: ICategoryCollection, index: number) => {
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
                },
              }}
              source={{ html: collection?.title }}
            />
            <Text>{collection?.description}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexGrow: 1,
    flexDirection: "column",
    padding: 10,
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
  },
});
