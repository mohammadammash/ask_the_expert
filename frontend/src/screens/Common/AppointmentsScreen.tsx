import { View } from "react-native";
//internal imports
import { ChatAndAppointmentCardComponent } from "../../components";
import { ScrollView } from "react-native-gesture-handler";

const AppointmentsScreen = () => {

  return (
    <View className="flex-1 items-center bg-white">
      <ScrollView className="w-full  mt-10" contentContainerStyle={{ alignItems: "center" }}>

        <ChatAndAppointmentCardComponent />
      </ScrollView>
    </View>
  );
};

export default AppointmentsScreen;
