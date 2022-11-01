import { View, } from "react-native";
//internal imports:
import { ProfilePersonalInfoComponent, ProfileImageCardComponent, AboutSectionComponent, ButtonsComponent } from "../../components";

const ProfileScreen = () => {

  return (
    <View className="flex-1 items-center bg-white">
      <ProfileImageCardComponent />

      <ProfilePersonalInfoComponent />

      <AboutSectionComponent />

      <ButtonsComponent/>
    </View>
  );
};

export default ProfileScreen;
