import { StyleSheet, TextInput, useColorScheme } from "react-native";
import React, { useState } from "react";
import { View } from "../Themed";
import { Feather } from "@expo/vector-icons";

const SearchComponent = () => {
  const [search, setSearch] = useState<string>("");
  const theme = useColorScheme() ?? "light";
  const ColorsInput = {
    light: {
      background: "#F6F6F6",
      text: "#000",
    },
    dark: {
      background: "#27282B",
      text: "#fff",
    },
  };

  const handleChange = (e: any) => {
    console.log(e);
    setSearch(e);
  };
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: ColorsInput[theme].background },
        ]}
      >
        <View
          lightColor={ColorsInput.light.background}
          darkColor={ColorsInput.dark.background}
          style={styles.iconContainer}
        >
          <Feather name="search" size={24} color={ColorsInput[theme].text} />
        </View>
        <TextInput
          style={[styles.input, { color: ColorsInput[theme].text }]}
          placeholder={"Search"}
          placeholderTextColor={ColorsInput[theme].text}
          onChangeText={handleChange}
          autoCapitalize="none"
          autoCorrect={false}
          value={search}
        />
      </View>
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: "100%",
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  iconContainer: {
    paddingHorizontal: 6,
  },
  errorText: {
    color: "red",
    marginTop: 4,
    fontSize: 12,
  },
});
