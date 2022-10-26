import { useNavigation } from "@react-navigation/native";
import { View, Image, ScrollView } from "react-native";
import RegisterForm from "../../components/Auth/RegisterForm";
import { IMAGES } from "../../constants";

const RegisterScreen = () => {
  return (
    <ScrollView>
      <View className="items-center mt-3">
        <RegisterForm />
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
