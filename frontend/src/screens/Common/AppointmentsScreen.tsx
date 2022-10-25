import { useNavigation } from "@react-navigation/native";
import { View, Text, Button, Image } from "react-native";
import { ROUTES, IMAGES, COLORS } from "../../constants";
import styles from "../../../styles";

const AppointmentsScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center bg-white">
      <View className="items-center justify-center h-1/2">
        <Text className="text-slate-800">My Appointments! 🎉</Text>
      </View>
      <View style={styles.blue_button_lg}>
        <Button color={COLORS.white} title="Novice Profile" onPress={() => navigation.navigate(ROUTES.NOVICE_PROFILE)} />
      </View>
    </View>
  );
};

export default AppointmentsScreen;
