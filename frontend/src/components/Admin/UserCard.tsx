import { View, Text, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView } from "react-native";
import { t } from "i18next";
import { useState } from "react";
//internal imports
import { COLORS, IMAGES, USERTYPES } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import styles from "../../../styles";
import { userType } from "../../hooks/UserContext";
import CalculateYearsOfExperienceHelper from "../../screens/Helpers/CalculateYearsOfExperienceHelper";

const UserCard = ({
  user,
  reviews_average,
  bgcolor_style,
  textcolor_style,
}: {
  user: userType;
  key: number;
  reviews_average: number;
  bgcolor_style: { backgroundColor: string };
  textcolor_style: { color: string };
}) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const toggleMoreInfo = () => setShowMoreInfo((prev) => !prev);

  //translation
  const more_info_string = t("Press On The Card To View All Info");
  const { profile_url, firstName, lastName, user_type, field, speciality, score, spoken_languages, about, email, isAvailable, start_date } = user;
  const yearsOfExperience = CalculateYearsOfExperienceHelper(start_date);

  return (
    <View style={styles.screenWidth}>
      <TouchableOpacity
        onPress={toggleMoreInfo}
        style={[styles.shadow_bg, bgcolor_style]}
        className={`rounded-lg border-2 items-center min-h-64 ${showMoreInfo ? "h-96" : "h-64"} min-h-64 mx-5 pt-3`}
      >
        <ScrollView className="w-full">
          <View className={`w-full ${user_type === USERTYPES.EXPERT && showMoreInfo ? "h-1/3" : ""} h-1/2 items-center gap-y-3`}>
            <View style={styles.border_blue} className="avatar aspect-square max-w-28 max-h-28 h-full w-full rounded-full border-4">
              <Image
                className="max-w-full max-h-full h-full w-full rounded-full"
                source={profile_url.length > 1 ? { uri: profile_url } : IMAGES.dummyProfile}
              />
            </View>

            <View className="text-center w-full">
              <Text className="font-bold text-center text-lg">
                {firstName[0].toUpperCase() +
                  firstName.substring(1, firstName.length).toLowerCase() +
                  " " +
                  lastName[0].toUpperCase() +
                  lastName.substring(1, lastName.length).toLowerCase()}{" "}
              </Text>
              <Text className="text-sm opacity-50 text-center capitalize">{field}</Text>
              <Text className="text-xs font-semibold text-center mt-2 uppercase">{user_type}</Text>
              <View className="absolute right-0 h-full justify-center mr-1">
                <AntDesign name="rightcircle" size={24} color="black" />
              </View>
            </View>
          </View>

          {/* MORE INFO SECTION */}
          {showMoreInfo && user_type === USERTYPES.NOVICE ? (
            <View className="p-1 h-64 min-h-64 justify-start gap-y-2">
              <View className="mb-1">
                <Text className="font-semibold text-sm">About:</Text>
                <Text className="font-normal text-xs">{about}</Text>
              </View>

              <View className="mb-1">
                <Text className="font-semibold text-sm">Speciality:</Text>
                <Text className="font-normal text-xs">{speciality}</Text>
              </View>

              <View className="mb-1">
                <Text className="font-semibold text-sm">Email:</Text>
                <Text className="font-normal text-xs">{email}</Text>
              </View>

              <View className="mb-5">
                <Text className="font-semibold text-sm">Spoken Languages:</Text>
                <Text className="font-normal text-xs">{spoken_languages}</Text>
              </View>
            </View>
          ) : showMoreInfo && user_type === USERTYPES.EXPERT ? (
            <View className="p-1 justify-start">
              <View className="mb-1">
                <Text className="font-semibold text-sm">About:</Text>
                <Text className="font-normal text-xs">{about}</Text>
              </View>

              <View className="mb-1">
                <Text className="font-semibold text-sm">Speciality:</Text>
                <Text className="font-normal text-xs">{speciality}</Text>
              </View>

              <View className="mb-3">
                <Text className="font-semibold text-sm">Email:</Text>
                <Text className="font-normal text-xs">{email}</Text>
              </View>

              <View className="mb-3">
                <Text className="font-semibold text-sm">Experience Years:</Text>
                <Text className="font-normal text-xs">{yearsOfExperience}</Text>
              </View>

              <View className="mb-3">
                <Text className="font-semibold text-sm">Available Right now:</Text>
                <Text className="font-normal text-xs">{isAvailable ? "Online" : "Offline"}</Text>
              </View>

              <View className="mb-5 pb-20">
                <Text className="font-semibold text-sm">Reviews Average:</Text>
                <Text className="font-normal text-xs">{reviews_average}.0</Text>
              </View>

              <View className="mb-5">
                <Text className="font-semibold text-sm">Score:</Text>
                <Text className="font-normal text-xs">{score} Points</Text>
              </View>
            </View>
          ) : null}
        </ScrollView>
      </TouchableOpacity>
      {!showMoreInfo ? (
        <View className="h-1/3 w-full text-center  py-5">
          <Text style={textcolor_style} className="opacity-40 italic text-xs text-center">
            {more_info_string}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default UserCard;
