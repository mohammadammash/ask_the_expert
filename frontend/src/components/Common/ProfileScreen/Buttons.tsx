import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
//internal imports
import styles from "../../../../styles";
import { ROUTES, USERTYPES } from "../../../constants";
import { UserContext } from "../../../hooks/UserContext";

const Buttons = () => {
  const navigation = useNavigation<any>();
  const { user, setUser } = useContext(UserContext);
  const { firstName, lastName, field, start_date, about, speciality, user_type } = user;

  return (
    <View>
      {/* EXPERT VISITING NOVICE PROFILE*/}
      {user_type === USERTYPES.EXPERT && (
        <View className="flex-row w-full justify-center gap-2 my-1">
          <Pressable style={styles.blue_button_sm} onPress={() => navigation.navigate(ROUTES.USER_SINGLE_CHAT)}>
            <Text className="text-white font-bold text-sm">MESSAGE</Text>
          </Pressable>
          <Pressable style={styles.blue_button_sm} onPress={() => alert("Blocked")}>
            <Text className="text-white font-bold text-sm">BLOCK</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Buttons;

  /* EDIT PROFILE BUTTON  */
  /* {user_type === USERTYPES.EXPERT && (
          <View>
            <Pressable className="my-2" style={styles.blue_button_md} onPress={() => navigation.navigate(ROUTES.USER_EDIT_PROFILE)}>
              <Text className="text-white font-bold text-base">EDIT PROFILE</Text>
            </Pressable>
          </View>
        )} */
