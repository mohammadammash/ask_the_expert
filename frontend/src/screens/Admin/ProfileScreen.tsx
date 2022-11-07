import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../hooks/UserContext";
import { useContext } from "react";
import { Entypo } from "@expo/vector-icons";
//internal imports:
import styles from "../../../styles";
import { ProfileImageCardComponent, ButtonsComponent } from "../../components";

const ProfileScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const { firstName, lastName, email, profile_url, user_type } = user;

  const navigation = useNavigation<any>();
  const navigateToPage = (routeName: string) => navigation.navigate(routeName);

  //Buttons comp params
  const data = {
    user_type,
    navigateToPage,
  };

  return (
    <View className="flex-1 items-center bg-white">
      <ProfileImageCardComponent profile_url={profile_url} />
      <View className="w-full items-center justify-start gap-6">
        {/* PERSONAL INFO */}
        <View className="mb-2">
          <Text style={styles.blue_text} className="font-bold text-2xl">
            {firstName} {lastName}
          </Text>
          <Text className="opacity-60 text-sm text-center">{email}</Text>
        </View>

        <View className="items-center gap-2">
          <Entypo name="shield" size={50} color="black" />
          <Text style={styles.dark_text} className="text-base font-bold">
            ADMINSTRATOR
          </Text>
        </View>

        <View className="items-center w-full">
          <ButtonsComponent {...data} />
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
