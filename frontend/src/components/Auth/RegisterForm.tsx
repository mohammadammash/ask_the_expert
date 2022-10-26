import { View, Text, Pressable, TextInput, Image } from "react-native";
import styles from "../../../styles";
import { ROUTES, IMAGES } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import { ALLJOBSFIELDS, ALLJOBSSPECIALTIES } from "../../constants";
import * as Yup from "yup";

import LanguagesSelectOptions from "./LanguagesSelectInput";
interface formValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  profile_base64: string;
  field: string;
  speciality: string;
  languages: string;
  start_date: Date;
}

const RegisterForm = () => {
  const navigation = useNavigation();
  const initialValues: formValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile_base64: "",
    field: "Tech1",
    speciality: "",
    languages: "",
    start_date: new Date(),
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    email: Yup.string().email("Please enter valid email").required("Email is required"),
    password: Yup.string()
      .matches(/\w*[a-z]\w*/, "Password must have a small letter")
      .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
      .matches(/\d/, "Password must have a number")
      .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .required("Required")
      .test("password-match", "Password must match", function (value) {
        return this.parent.password === value;
      }),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        alert(JSON.stringify(values, null, 2));
      }}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
        <View className="w-4/5 justify-around gap-2">
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

          <Picker enabled={true} mode="dropdown" placeholder="Select Field" selectedValue={values.field} onValueChange={handleChange("field")}>
            {ALLJOBSFIELDS.map((job, index) => (
              <Picker.Item label={job} value={job} key={index} />
            ))}
          </Picker>

          <Picker enabled={true} mode="dropdown" placeholder="Select Field" selectedValue={values.field} onValueChange={handleChange("field")}>
            {ALLJOBSSPECIALTIES.map((job, index) => (
              <Picker.Item label={job} value={job} key={index} />
            ))}
          </Picker>

          <LanguagesSelectOptions />

          <Pressable className="mt-2" style={styles.blue_button_xl} onPress={handleSubmit}>
            <Text className="text-xl text-white font-bold">LOGIN</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default RegisterForm;
