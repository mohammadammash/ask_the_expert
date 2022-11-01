import { View } from "react-native";
import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";
import { useNavigation } from "@react-navigation/native";
//internal imports:
import { ProfilePersonalInfoComponent, ProfileImageCardComponent, AboutSectionComponent, ButtonsComponent } from "../../components";
import CalculateYearsOfExperience from "../helpers/calculateYearsOfExperienceHelper";

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const navigateToPage = (routeName: string) => navigation.navigate(routeName);

  const { user, setUser } = useContext(UserContext);
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
  const buttonsData = {
    user_type,
    navigateToPage,
  }

  return (
    <View className="flex-1 items-center bg-white">
      <ProfileImageCardComponent profile_url={profile_url} />

      <ProfilePersonalInfoComponent {...personalInfoData} />

      <AboutSectionComponent {...aboutData} />

      <ButtonsComponent {...buttonsData}/>
    </View>
  );
};

export default ProfileScreen;
