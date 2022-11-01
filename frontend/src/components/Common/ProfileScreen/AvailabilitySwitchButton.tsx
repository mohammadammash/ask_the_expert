import { View, Text, Switch } from "react-native";
//internal imports
import { ROUTES, USERTYPES, COLORS } from "../../../constants";
import { AvailabilitySwitchButtonProps } from "../types";

const AvailabilitySwitchButton: React.FC<AvailabilitySwitchButtonProps> = ({ user_type, online, navigateToPage }) => {
  return (
    <View className="w-full">
      {/* SWITCH AVAILABLE BUTTON */}
      {user_type === USERTYPES.EXPERT && (
        <View className="h-24 w-full items-center justify-center mt-2" style={{ backgroundColor: COLORS.grey }}>
          <Text className="text-md">Go Online</Text>
          <View className="border rounded-2xl">
            <Switch
              trackColor={{ false: COLORS.white, true: COLORS.white }}
              thumbColor={!online ? COLORS.blue : COLORS.white}
              onValueChange={() => navigateToPage(ROUTES.EXPERT_GO_ONLINE)}
              value={!online}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default AvailabilitySwitchButton;
