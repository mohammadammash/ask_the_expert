import { View, Text, TextInput } from "react-native";
import styles from "../../../styles";
import { Formik } from "formik";
//internal imports
import { validateLoginFormSchema, loginIntialValues } from "./Helpers/LoginFormHelper";
import { LoginFormProps } from "./types";
import ButtonComponent from "../Common/Button";

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
        <View className="w-5/6 h-72 justify-evenly">
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

          <View>
            <Text className="font-bold">Password</Text>
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              style={styles.text_input}
              className="placeholder:pl-3"
              placeholder="Password"
              secureTextEntry={true}
            />
            {errors.password && touched.password && <Text className="text-red-600  ">{errors.password}</Text>}
          </View>

          <ButtonComponent button_style="xl" route_name="" title="LOGIN" handlePress={() => handleSubmit()} disabled={false} />
          {inValidCredentials && <Text className="text-red-600 text-center">InValid Credentials</Text>}
        </View>
      )}
    </Formik>
  );
};

export default LoginForm;
