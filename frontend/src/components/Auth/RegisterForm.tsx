import { View, Text, Pressable, TextInput, Image, Button, Platform } from "react-native";
import { Formik } from "formik";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";
//internal imports:
import styles from "../../../styles";
import authStyles from "./auth.styles";
import { IMAGES } from "../../constants";
import { ALLJOBSFIELDS, ALLJOBSSPECIALTIES } from "../../constants";
import { validateRegisterFormSchema, registerInitialValues } from "./Helpers/RegisterFormHelper";
import { ALLANGUAGES } from "../../constants";
import { RegisterFormProps } from "./types";
import { date } from "yup";

const RegisterForm: React.FC<RegisterFormProps> = ({
  image,
  showImage,
  emailAlreadyUsed,
  handleSelectedLanguages,
  selectedLanguages,
  handleFormSubmit,
  dateValue,
  updateDateValue,
  onDateChange,
}) => {
  return (
    <Formik
      initialValues={registerInitialValues}
      onSubmit={async (values) => {
        handleFormSubmit(values);
      }}
      validationSchema={validateRegisterFormSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
        <View className="w-4/5 justify-center gap-3">
          <View className="items-center">
            <View className="border-2 rounded-full h-36 w-36 mb-3">
              <Image className="rounded-full h-full w-full" source={image ? { uri: image } : IMAGES.dummyProfile} />
            </View>
            <Button title="Pick an image from camera roll" onPress={showImage} />
          </View>

          <View>
            <Text className="font-bold">Firstname</Text>
            <TextInput
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
              style={styles.text_input}
              className="placeholder:pl-3"
              placeholder="Firstname"
            />
            {errors.firstName && touched.firstName && <Text className="text-red-600">{errors.firstName}</Text>}
          </View>

          <View>
            <Text className="font-bold">LastName</Text>
            <TextInput
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
              style={styles.text_input}
              className="placeholder:pl-3"
              placeholder="lastname"
            />
            {errors.lastName && touched.lastName && <Text className="text-red-600">{errors.lastName}</Text>}
          </View>

          <View>
            <Text className="font-bold">Email</Text>
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              style={styles.text_input}
              className="placeholder:pl-3"
              placeholder="Email"
            />
            {errors.email && touched.email && <Text className="text-red-600">{errors.email}</Text>}
            {emailAlreadyUsed && <Text className="text-red-600">Email Already Used</Text>}
          </View>

          <View>
            <Text className="font-bold">Password</Text>
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              style={styles.text_input}
              className="placeholder:pl-3"
              placeholder="Password"
            />
            {errors.password && touched.password && <Text className="text-red-600  ">{errors.password}</Text>}
          </View>

          <View>
            <Text className="font-bold">Confirm Password</Text>
            <TextInput
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("ConfirmPassword")}
              value={values.confirmPassword}
              style={styles.text_input}
              className="placeholder:pl-3"
              placeholder="Renter Password"
            />
            {errors.confirmPassword && touched.confirmPassword && <Text className="text-red-600  ">{errors.confirmPassword}</Text>}
          </View>

          <View>
            <Text className="font-bold">About</Text>
            <TextInput
              onChangeText={handleChange("about")}
              onBlur={handleBlur("about")}
              value={values.about}
              className=" placeholder:pl-3 h-20 border-2 rounded-lg"
              placeholder="Talk About Your Career/Experience"
              multiline={true}
              numberOfLines={10}
            />
            {errors.about && touched.about && <Text className="text-red-600">{errors.about}</Text>}
          </View>

          <View>
            <Text className="mb-0 font-bold">Field:</Text>
            <View className={`${Platform.OS === "android" && "border-2 h-12 rounded-lg"}`}>
              <Picker
                style={styles.select_input}
                enabled={true}
                mode="dropdown"
                placeholder="Select Field"
                selectedValue={values.field}
                onValueChange={handleChange("field")}
              >
                {ALLJOBSFIELDS.map((job, index) => (
                  <Picker.Item label={job} value={job} key={index} />
                ))}
              </Picker>
            </View>
          </View>

          <View className="mb-2">
            <Text className="mb-0 font-bold">Speciality:</Text>
            <View className={`${Platform.OS === "android" && "border-2 h-12 rounded-lg"}`}>
              <Picker
                style={styles.select_input}
                enabled={true}
                mode="dropdown"
                placeholder="Select Field"
                selectedValue={values.speciality}
                onValueChange={handleChange("speciality")}
              >
                {ALLJOBSSPECIALTIES.map((job, index) => (
                  <Picker.Item label={job} value={job} key={index} />
                ))}
              </Picker>
            </View>
          </View>

          <View className="border-2 rounded-lg pl-1 mb-2">
            <MultiSelect
              style={authStyles.dropdown}
              placeholderStyle={authStyles.placeholderStyle}
              selectedTextStyle={authStyles.selectedTextStyle}
              inputSearchStyle={authStyles.inputSearchStyle}
              iconStyle={authStyles.iconStyle}
              search
              data={ALLANGUAGES}
              labelField="label"
              valueField="value"
              placeholder="Select Spoken Languages"
              searchPlaceholder="Search..."
              value={selectedLanguages}
              onChange={(item) => {
                handleSelectedLanguages(item);
                values.languages = item;
              }}
              renderLeftIcon={() => <AntDesign color="black" name="Safety" size={20} />}
              selectedStyle={authStyles.selectedStyle}
            />
            {errors.languages && touched.languages && <Text className="text-red-600  ">{errors.languages}</Text>}
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="mb-0 font-bold bold">
              Start Date:{"  "}
              {Platform.OS === "android"
                ? dateValue.date.getFullYear().toString() +
                  "/" +
                  (dateValue.date.getMonth() + 1).toString() +
                  "/" +
                  dateValue.date.getDate().toString()
                : null}
            </Text>
            {Platform.OS === "android" ? <Button onPress={() => updateDateValue({ ...dateValue, show: true })} title="Choose Date"></Button> : null}
          </View>
          <View className="items-end">
            {Platform.OS === "ios" || dateValue.show ? (
              <View className="border-2 rounded-lg items-center  mb-1 w-full">
                <DateTimePicker
                  style={authStyles.date}
                  value={dateValue.date}
                  display="default"
                  onChange={(event, date) => {
                    onDateChange(date);
                    date ? (values.start_date = date) : new Date();
                  }}
                />
              </View>
            ) : null}
          </View>

          <Pressable className="mt-2 mb-7" style={styles.blue_auth_button} onPress={handleSubmit}>
            <Text className="text-xl text-white font-bold">SIGN UP</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default RegisterForm;
