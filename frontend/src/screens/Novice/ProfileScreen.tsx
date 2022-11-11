import { View } from "react-native";
import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";
import { useNavigation } from "@react-navigation/native";
//internal imports:
import { userType } from "../../hooks/UserContext";
import { ProfilePersonalInfoComponent, ProfileImageCardComponent, AboutSectionComponent, ButtonComponent } from "../../components";
import CalculateYearsOfExperience from "../Helpers/CalculateYearsOfExperienceHelper";
import { USERTYPES } from "../../constants";

const ProfileScreen = ({ route }: { route: any }) => {
  const navigation = useNavigation<any>();
  let { user } = useContext(UserContext);
  //Novice user is accessed when expert click on novice to view Profile
  const { novice_user } = route.params;
  //If expert visiting novice_user show novice user data as main user
  if (novice_user) user = { ...novice_user };
  const { firstName, lastName, field, speciality, spoken_languages, start_date, profile_url, about, user_type } = user;
  const yearsOfExperience = CalculateYearsOfExperience(start_date);

  //params
  const personalInfoData = {
    firstName,
    lastName,
    field,
    speciality,
    spoken_languages,
    yearsOfExperience,
  };
  const aboutData = {
    about,
    user_type,
  };

  //Button handle click
  const handlePress = () => alert("CLICKED");
  const messageButtonData = {
    user_type,
    title: "Message",
    button_style: "sm",
    handlePress,
  };
  const blockButtonData = {
    ...messageButtonData,
    title: "Block",
  };

  return (
    <View className="bg-white h-full">
      <View className="items-center h-3/5">
        <ProfileImageCardComponent profile_url={profile_url} />

        <ProfilePersonalInfoComponent {...personalInfoData} />

        <View className="w-full mt-3 items-center">
          {/* If expert visiting novice profile */}
          {novice_user ? (
            <View className="flex-row w-3/4 justify-evenly">
              <ButtonComponent {...messageButtonData} />
              <ButtonComponent {...blockButtonData} />
            </View>
          ) : null}
        </View>
      </View>

      <View className="h-2/5 mt-3">
        <AboutSectionComponent {...aboutData} />
      </View>
    </View>
  );
};

export default ProfileScreen;
