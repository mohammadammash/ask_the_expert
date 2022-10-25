

import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, TextInput, Image, ScrollView } from "react-native";
import { ROUTES, IMAGES } from "../../constants";
import styles from "../../../styles";

const RegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View className="items-center mt-3">
        <View className="border-2 rounded-full h-36 w-36">
          <Image className="rounded-full h-full w-full" source={IMAGES.dummyProfile} />
        </View>

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
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;