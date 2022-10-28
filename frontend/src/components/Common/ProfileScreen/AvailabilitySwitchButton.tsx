import { View, Text, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
//internal imports
import { ROUTES, USERTYPES, COLORS } from "../../../constants";
import { UserContext } from "../../../hooks/UserContext";

const AvailabilitySwitchButton = () => {
  const navigation = useNavigation<any>();
  const { user, setUser } = useContext(UserContext);
  const { firstName, lastName, field, start_date, about, speciality, user_type } = user;

  return (
    <View>
      {/* SWITCH AVAILABLE BUTTON */}
      {user_type === USERTYPES.EXPERT && (
        <View className="h-24 w-full items-center justify-center gap-2 mt-2" style={{ backgroundColor: COLORS.grey }}>
          <Text className="text-md">Go Online</Text>
          <View className="border rounded-2xl">
            <Switch
              trackColor={{ false: COLORS.white, true: COLORS.white }}
              thumbColor={!user.online ? COLORS.blue : COLORS.white}
              onValueChange={() => navigation.navigate(ROUTES.EXPERT_GO_ONLINE)}
              value={!user.online}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default AvailabilitySwitchButton;
