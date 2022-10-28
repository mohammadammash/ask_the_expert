import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, TextInput, Image, ScrollView } from "react-native";
//internal imports
import { ROUTES, IMAGES } from "../../constants";
import styles from "../../../styles";
import { EditProfileFormComponent } from "../../components";

const EditProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
        <View className="flex-1 items-center justify-center">
          <EditProfileFormComponent />
        </View>
    </ScrollView>
  );
};

export default EditProfileScreen;
