import { View, Text, Pressable, TextInput, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ROUTES, IMAGES } from "../../constants";
import { LoginFormComponent } from "../../components";
import styles from "../../../styles";

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center bg-white">
      <View className="w-full mb-2 h-1/2">
        <Image className="max-w-full max-h-full" source={IMAGES.logo_500px} />
      </View>

      <LoginFormComponent />

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
