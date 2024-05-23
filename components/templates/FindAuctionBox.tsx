import { StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "../Themed";
import TextField from "../atoms/TextField";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Formik, Field, FormikHelpers, FormikValues } from "formik";
import * as Yup from "yup";
import CustomDropdown from "../atoms/CustomDropdown";
import ActionButton from "../atoms/ActionButton";
import { STRING_DATA } from "@/shareds/constants";
import Colors from "@/constants/Colors";
import {
  useFetchAssetTypes,
  useFetchBanks,
  useFetchCategories,
  useFetchLocations,
} from "@/hooks/useAuctionFilters";

const validationSchema = Yup.object().shape({});

const initialValues = {
  category: "",
  location: "",
  assetType: "",
  bank: "",
};

const FindAuctionBox = () => {
  const theme = useColorScheme() ?? "light";
  const formRef = useRef<any>(null);
  const { data: dataCategoriesOptions = [] } = useFetchCategories();
  const { data: dataLocationsOptions = [] } = useFetchLocations();
  const { data: dataBanksOptions = [] } = useFetchBanks();
  const { data: dataAssetTypesOptions = [] } = useFetchAssetTypes();

  const handleSubmit = (values: any) => {
    alert("searc hit");
  };

  // console.log(dataCategoriesOptions, "props");

  return (
    <View
      style={[
        styles.viewContainer,
        {
          borderWidth: 1,
          shadowRadius: 10,
          borderColor: Colors[theme].brandColor,
          borderRadius: 10,
          // marginVertical: 25,
        },
      ]}
    >
      <Text style={{ alignSelf: "center", fontSize: 24 }}>
        {STRING_DATA.FIND_AUCTION_LABEL}
      </Text>
      <Formik
        innerRef={(f) => (formRef.current = f)}
        initialValues={{
          ...initialValues,
          category: dataCategoriesOptions?.[0],
          assetType: dataAssetTypesOptions?.[0],
          location: dataLocationsOptions?.[0],
          bank: dataBanksOptions?.[0],
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, setFieldValue, values }: any) => (
          <View style={styles.formContainer}>
            <Field name="category">
              {() => (
                <CustomDropdown
                  items={dataCategoriesOptions}
                  selectedItem={values?.category}
                  showLabel={true}
                  label={"Category"}
                  showSearchArea={true}
                  placeholder={"Category"}
                  onchange={(e: any) => {
                    setFieldValue("category", e);
                  }}
                />
              )}
            </Field>
            <Field name="assetType">
              {() => (
                <CustomDropdown
                  items={dataAssetTypesOptions}
                  showLabel={true}
                  showSearchArea={true}
                  label={"Asset type"}
                  selectedItem={values?.assetType}
                  placeholder={"Asset type"}
                  onchange={(e: any) => {
                    setFieldValue("assetType", e);
                  }}
                />
              )}
            </Field>
            <Field name="location">
              {() => (
                <CustomDropdown
                  items={dataLocationsOptions}
                  selectedItem={values?.location}
                  showLabel={true}
                  showSearchArea={true}
                  label={"Locations"}
                  placeholder={"Neighbourhood, City or State"}
                  onchange={(e: any) => {
                    setFieldValue("location", e);
                  }}
                />
              )}
            </Field>
            <Field name="bank">
              {() => (
                <CustomDropdown
                  items={dataBanksOptions}
                  selectedItem={values?.bank}
                  showLabel={true}
                  showSearchArea={true}
                  label={"Banks"}
                  placeholder={"Banks"}
                  onchange={(e: any) => {
                    setFieldValue("bank", e);
                  }}
                />
              )}
            </Field>
            <ActionButton
              buttonLabel={STRING_DATA.SEARCH.toUpperCase()}
              onPress={handleSubmit}
              customStyle={{ paddingVertical: 25 }}
              customTitleStyle={{ fontSize: 24, fontWeight: "bold" }}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default FindAuctionBox;

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: "column",
    rowGap: 15,
  },
  viewContainer: {
    flexDirection: "column",
    padding: 10,
    rowGap: 20,
  },
});
