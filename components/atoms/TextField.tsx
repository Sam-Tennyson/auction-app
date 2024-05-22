import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Text, View } from "../Themed";

interface ITextField {
  placeholder?: string;
  field: {
    name: string;
    onBlur: (e: any) => void;
    onChange: (e: any) => any;
    value: any;
  };
  form: {
    errors: any;
    touched: any;
    setFieldTouched: (name: string, value?: boolean) => void;
  };
  onRightIconClick: () => void;
  leftIcon: any;
  rightIcon: any;
  secureTextEntry?: boolean;
  disabled?: boolean;
}

const TextField = (props: ITextField) => {
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

  const {
    placeholder,
    field: { name, onBlur, onChange = () => {}, value },
    form: { errors, touched, setFieldTouched },
    leftIcon,
    rightIcon,
    secureTextEntry = false,
    disabled = false,
    onRightIconClick = () => {},
    ...inputProps
  } = props;
  const hasError = errors[name] && touched[name];
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: ColorsInput[theme].background },
        ]}
      >
        {leftIcon && (
          <View
            lightColor={ColorsInput.light.background}
            darkColor={ColorsInput.dark.background}
            style={styles.iconContainer}
          >
            {leftIcon}
          </View>
        )}
        <TextInput
          style={[styles.input, { color: ColorsInput[theme].text }]}
          placeholder={placeholder}
          placeholderTextColor={ColorsInput[theme].text}
          onChangeText={(text) => onChange(name)(text)}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          autoCorrect={false}
          value={value}
          editable={!disabled}
          {...inputProps}
        />
        {rightIcon && (
          <View
            lightColor={ColorsInput.light.background}
            darkColor={ColorsInput.dark.background}
            style={styles.iconContainer}
          >
            <TouchableOpacity
              onPress={onRightIconClick}
              style={styles.iconContainer}
            >
              {rightIcon}
            </TouchableOpacity>
          </View>
        )}
      </View>
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
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

export default TextField;
