import { View, Text, Pressable, TextInput } from "react-native";
import styles from "../../../styles";
import { ROUTES } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const RegisterForm = () => {
  const navigation = useNavigation();

  return (
    <View className="w-4/5 justify-around gap-2">
      <View>
        <Text>Email</Text>
        <TextInput style={styles.text_input} className="placeholder:pl-3" value="" placeholder="Email" />
      </View>

      <View>
        <Text>Email</Text>
        <TextInput style={styles.text_input} className="placeholder:pl-3" value="" placeholder="Email" />
      </View>

      <View>
        <Text>Email</Text>
        <TextInput style={styles.text_input} className="placeholder:pl-3" value="" placeholder="Email" />
      </View>

      <View>
        <Text>Email</Text>
        <TextInput style={styles.text_input} className="placeholder:pl-3" value="" placeholder="Email" />
      </View>

      <View>
        <Text>Email</Text>
        <TextInput style={styles.text_input} className="placeholder:pl-3" value="" placeholder="Email" />
      </View>

      <View>
        <Text>Email</Text>
        <TextInput style={styles.text_input} className="placeholder:pl-3" value="" placeholder="Email" />
      </View>

      <View className="mb-3">
        <Text>Password</Text>
        <TextInput style={styles.text_input} className="placeholder:pl-3" value="" placeholder="Password" />
      </View>

      <Pressable className="mb-5" style={styles.blue_button_xl} onPress={() => navigation.navigate(ROUTES.REGISTER)}>
        <Text className="text-xl text-white">REGISTER</Text>
      </Pressable>
    </View>
  );
};

export default RegisterForm;
{
  /* confirmPassword: Yup.string()
         .required("Required")
       .test("password-match", "Password must match", function (value) {
          return this.parent.password === value;
         }), */
}
