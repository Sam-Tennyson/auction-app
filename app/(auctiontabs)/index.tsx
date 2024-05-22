import { StyleSheet } from "react-native";
import React from "react";
import { Text, View } from "@/components/Themed";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import FindAuctionBox from "@/components/templates/FindAuctionBox";
import { SafeAreaView } from "react-native-safe-area-context";

const Page = () => {
  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
      }}
    >
      <GestureHandlerRootView style={{ flex: 1, flexGrow: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: "column",
            rowGap: 15,
            padding: 10,
            justifyContent: "center",
            height: "100%",
          }}
        >
          <FindAuctionBox />
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
