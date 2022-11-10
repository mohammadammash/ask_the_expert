import { View, Text, Switch, Platform } from "react-native";
import styles from "../../../../styles";
//internal imports
import { ROUTES, USERTYPES, COLORS } from "../../../constants";
import { AvailabilitySwitchButtonProps } from "../types";

const AvailabilitySwitchButton: React.FC<AvailabilitySwitchButtonProps> = ({ user_type, isAvailable, navigateToPage }) => {
  return (
    <View className="w-full">
      {/* SWITCH AVAILABLE BUTTON */}
      {user_type === USERTYPES.EXPERT && (
        <View className="h-24 w-full items-center justify-center mt-2" style={styles.bg_grey}>
          <Text className="text-md">Go Online</Text>
          <View className={`${Platform.OS === "ios" && "border"} rounded-2xl`}>
            <Switch
              trackColor={{ false: COLORS.white, true: COLORS.white }}
              thumbColor={!isAvailable ? COLORS.blue : COLORS.white}
              onValueChange={() => navigateToPage(ROUTES.EXPERT_GO_ONLINE)}
              value={!isAvailable}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default AvailabilitySwitchButton;
