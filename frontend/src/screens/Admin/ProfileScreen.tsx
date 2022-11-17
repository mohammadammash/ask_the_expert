import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../hooks/UserContext";
import { useContext } from "react";
import { Entypo } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
//internal imports:
import styles from "../../../styles";
import { ProfileImageCardComponent, ButtonComponent } from "../../components";
import { t } from "i18next";

const ProfileScreen = () => {
  //translation
  const adminstrator_string = t("adminstrator");
  
  //theme
  const {colorScheme} = useColorScheme();
  const bgcolor_style = colorScheme === "dark" ? styles.bg_dark : styles.bg_white;
  const textcolor_style = colorScheme === "dark" ? styles.grey_text : styles.dark_text;

  const { user, setUser } = useContext(UserContext);
  const { firstName, lastName, email, profile_url, user_type } = user;

  const navigation = useNavigation<any>();
  const handlePress = (routeName: string) => navigation.navigate(routeName);

  //Buttons comp params
  const data = {
    user_type,
    handlePress,
    button_style: "xl",
    route_name: "",
    disabled: false,
    title: "View Banned Users",
    textcolor_style,
  };

  return (
    <View style={bgcolor_style} className="flex-1 items-center bg-white">
      <ProfileImageCardComponent profile_url={profile_url} />
      <View className="w-full items-center justify-start gap-6">
        {/* PERSONAL INFO */}
        <View className="mb-2">
          <Text style={styles.blue_text} className="font-bold text-2xl">
            {firstName} {lastName}
          </Text>
          <Text style={textcolor_style} className="opacity-60 text-sm text-center">
            {email}
          </Text>
        </View>

        <View className="items-center gap-2">
          <Entypo name="shield" size={50} color={textcolor_style.color} />
          <Text style={textcolor_style} className="text-base font-bold uppercase">
            {adminstrator_string}
          </Text>
        </View>

        <View className="items-center w-full">
          <ButtonComponent {...data} />
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
