import { View, Text, TextInput, Pressable } from "react-native";
import { useContext, useState } from "react";
import { UserContext } from "../../hooks/UserContext";
import styles from "../../../styles";
import { Formik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

import { validateLoginFormSchema, loginIntialValues } from "./helpers/loginFormHelper";

const LoginForm = () => {
  const [inValidCredentials, setInValidCredentials] = useState(false);

  const firbaseConfirmLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("___SUCESSS________");
        console.log("___SUCESSS________");
        console.log(user);
        console.log("___SUCESSS________");
        console.log("___SUCESSS________");
        alert(user);
        // ...
      })
      .catch((error) => {
        alert(error.code);
        alert("Invalid Credentials");
        setInValidCredentials(true);
      });
  };

  return (
    <Formik
      initialValues={loginIntialValues}
      onSubmit={(values, actions) => {
        setInValidCredentials(false);
        firbaseConfirmLogin(values.email, values.password);
        // console.log({ values, actions });
        // alert(JSON.stringify(values, null, 2));
      }}
      validationSchema={validateLoginFormSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
        <View className="w-4/5 h-64 justify-evenly">
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

          <Pressable className="mt-2" style={styles.blue_button_xl} onPress={handleSubmit}>
            <Text className="text-xl text-white font-bold">LOGIN</Text>
          </Pressable>
          {inValidCredentials && <Text className="text-red-600 text-center">InValid Credentials</Text>}
        </View>
      )}
    </Formik>
  );
};

export default LoginForm;
