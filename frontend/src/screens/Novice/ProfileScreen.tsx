import { View, ScrollView, RefreshControl } from "react-native";
import { useState, useCallback, useEffect } from "react";
import { useUserContext } from "../../hooks/UserContext";
import { useNavigation } from "@react-navigation/native";
//internal imports:
import { ProfilePersonalInfoComponent, ProfileImageCardComponent, AboutSectionComponent, ButtonComponent } from "../../components";
import CalculateYearsOfExperience from "../Helpers/CalculateYearsOfExperienceHelper";
import { ROUTES } from "../../constants";
import { useCurrentUser } from "../../hooks/useUser";

const ProfileScreen = ({ route }: { route: any }) => {
  const navigation = useNavigation<any>();
  let { user, setUser } = useUserContext();
  //Novice user is accessed when expert click on novice to view Profile
  let novice_user;
  if (route.params) novice_user = route.params.novice_user;
  //If expert visiting novice_user show novice user data as main user
  if (novice_user) user = { ...novice_user };
  const { firstName, lastName, field, speciality, spoken_languages, start_date, profile_url, about, user_type } = user;
  const yearsOfExperience = CalculateYearsOfExperience(start_date);

  //----------------------------------------------
  //START OF REFRESH PAGE UPDATE CURRENT USER DATA
  const [refreshing, setRefreshing] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const { data: getCurrentUserData, isLoading: isCurrentUserLoading, isSuccess: isCurrentUserUpdatedSuccess } = useCurrentUser({ enabled });

  const onRefresh = useCallback(() => {
    if (!novice_user && user) {
      setRefreshing(true);
      setEnabled(true); //call useCurrentUser //update current user
    }
  }, []);

  useEffect(() => {
    //userData is reRetrieved and loading stopped => update Current user Data
    if (isCurrentUserUpdatedSuccess && !isCurrentUserLoading) {
      setUser({ ...getCurrentUserData });
      setRefreshing(false);
      setEnabled(false);
    }
  }, [getCurrentUserData]);
  //END OF REFRESH PAGE UPDATE CURRENT USER DATA
  //----------------------------------------------

  //---------------
  //START OF PARAMS
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

  //handle button click
  const handlePress = (route_name: string) => {
    if (route_name === ROUTES.USER_EDIT_PROFILE) navigation.navigate(route_name);
    else if (route_name === ROUTES.USER_SINGLE_CHAT) {
      navigation.navigate(route_name, { data: novice_user });
    }
    //block
    else {
      alert("BLOCKKK");
    }
  };
  const messageButtonData = {
    user_type,
    title: "Message",
    button_style: "sm",
    handlePress,
    disabled: false,
    route_name: ROUTES.USER_SINGLE_CHAT,
  };
  const blockButtonData = {
    ...messageButtonData,
    title: "Block",
    route_name: "block",
  };
  const editProfileButtonData = {
    ...messageButtonData,
    title: "Edit Profile",
    route_name: ROUTES.USER_EDIT_PROFILE,
    button_style: "md",
  };
  //---------------
  //end OF PARAMS

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      className="bg-white border flex-1"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="items-center h-4/6">
        <ProfileImageCardComponent profile_url={profile_url} />

        <ProfilePersonalInfoComponent {...personalInfoData} />

        <View className="w-full mt-5 items-center">
          {/* If expert visiting novice profile */}
          {novice_user ? (
            <View className="flex-row w-3/4 justify-evenly">
              <ButtonComponent {...messageButtonData} />
              <ButtonComponent {...blockButtonData} />
            </View>
          ) : (
            // IF CURRENT USER PROFILE
            <ButtonComponent {...editProfileButtonData} />
          )}
        </View>
      </View>

      <View className="h-2/6">
        <AboutSectionComponent {...aboutData} />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
