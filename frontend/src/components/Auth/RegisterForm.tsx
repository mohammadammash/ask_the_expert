import { View, Text, Pressable, TextInput, Image } from "react-native";
import { useState } from "react";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";

import styles from "../../../styles";
import authStyles from "./auth.styles";
import { IMAGES } from "../../constants";
import { ALLJOBSFIELDS, ALLJOBSSPECIALTIES } from "../../constants";
import { validateRegisterFormSchema, registerInitialValues } from "../index";
import { ALLANGUAGES } from "../../constants";

const RegisterForm = () => {
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  return (
    <Formik
      initialValues={registerInitialValues}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        alert(JSON.stringify(values, null, 2));
      }}
      validationSchema={validateRegisterFormSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
        <View className="w-4/5 justify-center">
          <View className="items-center">
            <View className="border-2 rounded-full h-36 w-36 ">
              <Image className="rounded-full h-full w-full" source={IMAGES.dummyProfile} />
            </View>
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

          <View className="mt-2">
            <Text className="font-bold">LastName</Text>
            <TextInput onChangeText={handleChange("lastName")} onBlur={handleBlur("lastName")} value={values.lastName} style={styles.text_input} className="placeholder:pl-3" placeholder="lastname" />
            {errors.lastName && touched.lastName && <Text className="text-red-600">{errors.lastName}</Text>}
          </View>

          <View>
            <Text className="font-bold">Email</Text>
            <TextInput onChangeText={handleChange("email")} onBlur={handleBlur("email")} value={values.email} style={styles.text_input} className="placeholder:pl-3" placeholder="Email" />
            {errors.email && touched.email && <Text className="text-red-600">{errors.email}</Text>}
          </View>

          <View className="mt-2">
            <Text className="font-bold">Password</Text>
            <TextInput onChangeText={handleChange("password")} onBlur={handleBlur("password")} value={values.password} style={styles.text_input} className="placeholder:pl-3" placeholder="Password" />
            {errors.password && touched.password && <Text className="text-red-600  ">{errors.password}</Text>}
          </View>

          <View className="mt-2">
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
            <Text className="mt-3 mb-0 font-bold border-b-2 bold">Field:</Text>
            <Picker style={styles.select_input} enabled={true} mode="dropdown" placeholder="Select Field" selectedValue={values.field} onValueChange={handleChange("field")}>
              {ALLJOBSFIELDS.map((job, index) => (
                <Picker.Item label={job} value={job} key={index} />
              ))}
            </Picker>
          </View>

          <View>
            <Text className="mb-0 font-bold border-b-2 bold">Speciality:</Text>
            <Picker style={styles.select_input} enabled={true} mode="dropdown" placeholder="Select Field" selectedValue={values.speciality} onValueChange={handleChange("speciality")}>
              {ALLJOBSSPECIALTIES.map((job, index) => (
                <Picker.Item label={job} value={job} key={index} />
              ))}
            </Picker>
          </View>

          <View className="border-2 rounded-lg mb-5">
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
                setSelectedLanguages(item);
                values.languages = item;
              }}
              renderLeftIcon={() => <AntDesign style={styles.icon} color="black" name="Safety" size={20} />}
              selectedStyle={authStyles.selectedStyle}
            />
            {errors.languages && touched.languages && <Text className="text-red-600  ">{errors.languages}</Text>}
          </View>

          <Pressable className="mt-2" style={styles.blue_button_xl} onPress={handleSubmit}>
            <Text className="text-xl text-white font-bold">LOGIN</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default RegisterForm;
