import {
  StyleSheet,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import React from "react";
import { Text } from "../Themed";
import Colors from "@/constants/Colors";

interface IActionButton {
  loading?: boolean;
  customTitleStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  buttonLabel: string;
  customStyle?: object; // Allow custom styles to be passed from parent
}

const ActionButton = (props: IActionButton) => {
  const {
    loading = false,
    onPress = () => {},
    buttonLabel = "",
    customStyle = {},
    customTitleStyle,
  } = props;
  const theme = useColorScheme() ?? "light";

  return (
    <TouchableOpacity
      style={[
        styles.defaultButtonStyle,
        customStyle,
        { backgroundColor: Colors[theme].brandColor },
      ]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.defaultTitleStyle, customTitleStyle]}>
          {buttonLabel}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  defaultButtonStyle: {
    borderRadius: 16,
    minHeight: 50,
    padding: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  defaultTitleStyle: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ActionButton;
