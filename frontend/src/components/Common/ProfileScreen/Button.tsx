import { View, Text, Pressable } from "react-native";
//internal imports
import styles from "../../../../styles";
import { ButtonComponentProps } from "../types";

const Button: React.FC<ButtonComponentProps> = ({ button_style, title, handlePress }) => {
  let current_style;
  if (button_style === "md") current_style = styles.blue_button_md;

  return (
    <View className="w-full">
      <View className="flex-row w-full justify-center gap-2 my-1">
        <Pressable style={current_style} onPress={handlePress}>
          <Text className="text-white font-bold text-sm">{title}</Text>
        </Pressable>
      </View>

      {/* ADMIN PROFILE BUTTONS */}
      {/* {user_type === USERTYPES.ADMIN && (
        <View className="flex-row w-full justify-center gap-2 my-1">
          <Pressable style={styles.blue_button_sm} onPress={() => navigateToPage(ROUTES.USER_EDIT_PROFILE)}>
            <Text className="text-white font-bold text-[10px]">EDIT PROFILE</Text>
          </Pressable>
          <Pressable style={styles.blue_button_sm} onPress={() => navigateToPage(ROUTES.ADMIN_VIEW_BANNED_USERS)}>
            <Text className="text-white font-bold text-[10px]">BANNED USERS</Text>
          </Pressable>
        </View>
      )} */}

      {/* NOVICE VISTING EXPERT PROFILE BUTTONS */}
      {/* {user_type === USERTYPES.NOVICE && (
        <View className="flex-row justify-evenly my-2">
          <Pressable style={styles.blue_button_sm} onPress={() => navigateToPage(ROUTES.NOVICE_BOOK_APPOINTMENT)}>
            <Text className="text-white font-bold text-[10px]">BOOK</Text>
          </Pressable>
          <Pressable style={styles.blue_button_sm} onPress={() => navigateToPage(ROUTES.USER_SINGLE_CHAT)}>
            <Text className="text-white font-bold text-[10px]">MESSAGE</Text>
          </Pressable>
          <Pressable style={styles.blue_button_sm} onPress={() => alert("Blocked")}>
            <Text className="text-white font-bold text-[10px]">BLOCK</Text>
          </Pressable>
        </View>
      )} */}

      {/* NOVICE VISITNG HIS OWN PROFILE */}
      {/* {user_type === USERTYPES.NOVICE && id === shownuser_id && (
        <View className="mt-5" style={styles.blue_button_lg}>
          <Button color={COLORS.white} title="Edit Profile" onPress={() => navigateToPage(ROUTES.USER_EDIT_PROFILE)} />
        </View>
      )} */}
    </View>
  );
};

export default Button;
