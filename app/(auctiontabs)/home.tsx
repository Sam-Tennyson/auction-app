import { StyleSheet } from "react-native";
import React from "react";
import { Text, View } from "@/components/Themed";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import Home from "@/components/templates/Home";

const Page = () => {
  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        flexDirection: "column",
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: "column",
            rowGap: 15,
            padding: 20,
          }}
        >
          <Home />
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
