import { View, Text, Button } from "react-native";
import { COLORS, ROUTES } from "../../constants";
import React from "react";
import styles from "../../../styles";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>ProfileScreen Admin</Text>
      <View className="mt-5" style={styles.blue_button_lg}>
        <Button color={COLORS.white} title="Edit Profile" onPress={() => navigation.navigate(ROUTES.USER_EDIT_PROFILE)} />
      </View>
    </View>
  );
};

export default ProfileScreen;
