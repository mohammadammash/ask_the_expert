import { View, Text, TextInput, Pressable } from "react-native";
import styles from "../../../styles";
import { Formik } from "formik";
//internal imports
import { validateLoginFormSchema, loginIntialValues } from "./Helpers/LoginFormHelper";
import { LoginFormProps } from "./types";

const LoginForm: React.FC<LoginFormProps> = ({ handleInvalidCredentials, inValidCredentials, firbaseConfirmLogin }) => {
  return (
    <Formik
      initialValues={loginIntialValues}
      onSubmit={(values) => {
        handleInvalidCredentials(false);
        firbaseConfirmLogin(values.email, values.password);
      }}
      validationSchema={validateLoginFormSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
        <View className="w-4/5 h-64 justify-evenly">
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
          </View>

          <View className="mt-2">
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

          <Pressable className="mt-2" style={styles.blue_auth_button} onPress={handleSubmit}>
            <Text className="text-xl text-white font-bold">LOGIN</Text>
          </Pressable>
          {inValidCredentials && <Text className="text-red-600 text-center">InValid Credentials</Text>}
        </View>
      )}
    </Formik>
  );
};

export default LoginForm;
