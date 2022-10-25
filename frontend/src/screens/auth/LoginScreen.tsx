import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, TextInput, Image } from "react-native";
import { useContext } from "react";
import { ROUTES, IMAGES } from "../../constants";
import { UserContext } from "../../hooks/UserContext";
import styles from "../../../styles";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);

  return (
    <View className="flex-1 items-center bg-white">
      <View className="w-full mb-2 h-1/2">
        <Image className="max-w-full max-h-full" source={IMAGES.logo_500px} />
      </View>

      <View className="w-4/5 h-60 justify-around">
        <View>
          <Text>Email</Text>
          <TextInput style={styles.text_input} className="placeholder:pl-3" value="" placeholder="Email" />
        </View>
        <View>
          <Text>Password</Text>
          <TextInput style={styles.text_input} className="placeholder:pl-3" value="" placeholder="Password" />
        </View>
        <Pressable style={styles.blue_button_xl} onPress={() => navigation.navigate(ROUTES.REGISTER)}>
          <Text className="text-xl text-white">LOGIN</Text>
        </Pressable>
      </View>

      <View className="flex-row mt-10">
        <Text className="inline mr-1">Don't have an account?</Text>
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
