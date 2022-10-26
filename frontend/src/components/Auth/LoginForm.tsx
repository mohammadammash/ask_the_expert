import { View, Text, TextInput, Pressable, Button } from "react-native";
import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../constants";
import styles from "../../../styles";
import { Formik, Form, FormikProps } from "formik";

interface formValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const initialValues: formValues = {
    email: "",
    password: "",
  };

  return (
    <View className="w-4/5 h-60 justify-around">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
        }}
      >

        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <View>
              <Text className="font-bold">Email</Text>
              <TextInput onChangeText={handleChange("email")} onBlur={handleBlur("email")} value={values.email} style={styles.text_input} className="placeholder:pl-3" placeholder="Email" />
            </View>
            <View className="mb-5">
              <Text className="font-bold">Password</Text>
              <TextInput onChangeText={handleChange("password")} onBlur={handleBlur("password")} value={values.password} style={styles.text_input} className="placeholder:pl-3" placeholder="Password" />
            </View>
            <Pressable style={styles.blue_button_xl} onPress={handleSubmit}>
              <Text className="text-xl text-white font-bold">LOGIN</Text>
            </Pressable>
          </View>
        )}
        
      </Formik>
    </View>
  );
};

export default LoginForm;
