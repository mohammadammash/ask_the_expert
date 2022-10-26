import { View, Text, TextInput, Pressable } from 'react-native'
import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../constants";
import styles from "../../../styles";


const LoginForm = () => {
  const navigation = useNavigation();

  return (
    <View className="w-4/5 h-60 justify-around">
      <View>
        <Text className='font-bold'>Email</Text>
        <TextInput style={styles.text_input} className="placeholder:pl-3" value="" placeholder="Email" />
      </View>
      <View>
        <Text className='font-bold'>Password</Text>
        <TextInput style={styles.text_input} className="placeholder:pl-3" value="" placeholder="Password" />
      </View>
      <Pressable style={styles.blue_button_xl} onPress={() => navigation.navigate(ROUTES.REGISTER)}>
        <Text className="text-xl text-white font-bold">LOGIN</Text>
      </Pressable>
    </View>
  );
}

export default LoginForm