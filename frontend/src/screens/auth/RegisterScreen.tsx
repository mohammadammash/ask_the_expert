import { useNavigation } from "@react-navigation/native";
import { View, Image, ScrollView } from "react-native";
import { RegisterFormComponent } from "../../components";
import { IMAGES } from "../../constants";

const RegisterScreen = () => {
  return (
    <ScrollView>
      <View className="items-center mt-3">
        <RegisterFormComponent />
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
