import { StyleSheet, useColorScheme } from "react-native";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import { Text } from "../Themed";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface CustomDropdownProps {
  open?: boolean;
  selectedItem?: any;
  items: { label: string; value: string }[] | any;
  placeholder?: string;
  label?: string;
  showLabel?: boolean;
  setValue?: React.Dispatch<React.SetStateAction<any>>;
  onchange?: (event: any) => void;
  searchPlaceholder?: string;
  showSearchArea?: boolean;
}

const DROPDOWN_COLOR = {
  LIGHT_BG: "#F0F3F8",
  DARK_BG: "#1A1F23",
  LIGHT_TEXT_COLOR: "#1A1F23",
  DARK_TEXT_COLOR: "#f2f2f2",
  PLACEHOLDER_LIGHT: "#ccc",
  PLACEHOLDER_DARK: "#31363F",
};

const CustomDropdown = (props: CustomDropdownProps) => {
  const {
    open,
    selectedItem,
    showLabel = false,
    items,
    setValue = () => {},
    placeholder,
    onchange = () => {},
    label = "",
    showSearchArea = false,
    searchPlaceholder = "",
    ...restProps
  } = props;
  const theme = useColorScheme() ?? "light";

  const ColorsDropdown = {
    light: {
      background: DROPDOWN_COLOR.LIGHT_BG,
      text: DROPDOWN_COLOR.LIGHT_TEXT_COLOR,
      placeholder: DROPDOWN_COLOR.PLACEHOLDER_LIGHT,
    },
    dark: {
      background: DROPDOWN_COLOR.DARK_BG,
      text: DROPDOWN_COLOR.DARK_TEXT_COLOR,
      placeholder: DROPDOWN_COLOR.PLACEHOLDER_DARK,
    },
  };

  const [isFocus, setIsFocus] = React.useState(false);

  const renderLabel = () => {
    if (selectedItem || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  return (
    <>
      {showLabel ? <Text>{label}</Text> : ""}
      <Dropdown
        containerStyle={{
          backgroundColor: ColorsDropdown[theme]?.background,
          shadowColor: ColorsDropdown[theme]?.background,
          borderWidth: 0,
          maxHeight: 200,
        }}
        itemContainerStyle={{
          backgroundColor: ColorsDropdown[theme]?.background,
        }}
        itemTextStyle={{
          color: ColorsDropdown[theme]?.text,
        }}
        style={[
          styles.dropdown,
          {
            backgroundColor: ColorsDropdown[theme]?.background,
            borderWidth: 1,
            borderColor: Colors[theme]?.brandColor,
          },
        ]}
        placeholderStyle={[
          styles.placeholderStyle,
          { color: ColorsDropdown[theme]?.placeholder },
        ]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          {
            color: ColorsDropdown[theme]?.text,
            backgroundColor: ColorsDropdown[theme]?.background,
          },
        ]}
        selectedTextProps={{ numberOfLines: 1 }}
        activeColor={ColorsDropdown[theme]?.background}
        inputSearchStyle={[
          styles.inputSearchStyle,
          { color: ColorsDropdown[theme]?.text },
        ]}
        iconStyle={styles.iconStyle}
        data={items}
        value={selectedItem}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={onchange}
        search={showSearchArea}
        searchPlaceholder={searchPlaceholder || "Search ..."}
        renderRightIcon={() => {
          return (
            <AntDesign
              name="caretdown"
              size={10}
              color={ColorsDropdown[theme]?.text}
            />
          );
        }}
        placeholder={placeholder ?? "Select"}
        labelField={"label"}
        valueField={"value"}
        {...restProps}
      />
    </>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F3F8",
    padding: 16,
  },
  dropdown: {
    borderRadius: 6,
    shadowColor: "#F0F3F8",
    paddingHorizontal: 14,
    minWidth: 120,
  },
  label: {
    position: "absolute",
    backgroundColor: "#F0F3F8",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
