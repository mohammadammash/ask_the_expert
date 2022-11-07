import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
//internal imports
import { ChatAndAppointmentCardComponent } from "../../components";
import { ScrollView } from "react-native-gesture-handler";
import { ROUTES } from "../../constants";
import styles from "../../../styles";

const AppointmentsScreen = () => {
  const navigation = useNavigation<any>();
  const NavigateToPage = () => {
    // CHATS PAGE NAVIGATION
    navigation.navigate(ROUTES.USER_SINGLE_CHAT);
  };

  // PARAMS
  const data = {
    NavigateToPage,
  };

  return (
    <View className="flex-1 items-center bg-white">
      <ScrollView className="w-full" contentContainerStyle={styles.alignCenter}>
        <ChatAndAppointmentCardComponent {...data} />
      </ScrollView>
    </View>
  );
};

export default AppointmentsScreen;
