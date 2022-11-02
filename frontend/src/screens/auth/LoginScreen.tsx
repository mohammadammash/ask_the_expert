import { View, Text, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
//internal imports
import { ROUTES, IMAGES } from "../../constants";
import { LoginFormComponent } from "../../components";
import styles from "../../../styles";
import { auth } from "../../../firebaseConfig";

const LoginScreen = () => {
  const navigation = useNavigation<any>();

  //FORM DATA
  const [inValidCredentials, setInValidCredentials] = useState(false);
  const handleInvalidCredentials = (value: boolean) => setInValidCredentials(value);

  //FIREBASE AUTH
  const firbaseConfirmLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert(user);
      })
      .catch((error) => {
        alert(error.code);
        alert("Invalid Credentials");
        handleInvalidCredentials(true);
      });
  };

  //PARAMS
  const data = {
    inValidCredentials,
    handleInvalidCredentials,
    firbaseConfirmLogin,
  };

  //MAIN COMPONENT
  return (
    <View className="flex-1 items-center bg-white">
      <View className="w-full mb-2 h-1/2">
        <Image className="max-w-full max-h-full" source={IMAGES.logo_500px} />
      </View>

      <LoginFormComponent {...data}/>

      <View className="flex-row mt-10">
        <Text className="inline mr-1 font-bold">Don't have an account?</Text>
        <Pressable onPress={() => navigation.navigate(ROUTES.REGISTER)}>
          <Text className="font-bold" style={styles.orange_text}>
            Sign up
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
