import { View, Text, Image, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { t } from "i18next";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//internal imports
import { COLORS, IMAGES, USERTYPES } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import styles from "../../../styles";
import CalculateYearsOfExperienceHelper from "../../screens/Helpers/CalculateYearsOfExperienceHelper";
import { UserCardProps } from "./types";

const UserCard: React.FC<UserCardProps> = ({ user, reviews_average, bgcolor_style, textcolor_style, handlePress }): JSX.Element => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const toggleMoreInfo = () => setShowMoreInfo((prev) => !prev);

  //translation
  const more_info_string = t("Press On The Card To View All Info");
  const {
    _id,
    profile_url,
    firstName,
    lastName,
    user_type,
    field,
    speciality,
    score,
    spoken_languages,
    about,
    email,
    isAvailable,
    start_date,
    isBanned,
  } = user;
  const yearsOfExperience = CalculateYearsOfExperienceHelper(start_date);
  const banuser_string = t("BAN USER");
  const unbanuser_string = t("UNBAN USER");

  return (
    <View style={styles.screenWidth}>
      <TouchableOpacity
        onPress={toggleMoreInfo}
        style={[styles.shadow_bg, bgcolor_style]}
        className={`rounded-lg border-2 items-center  ${showMoreInfo ? "h-96" : "h-72"} min-h-64 mx-5 pt-3`}
      >
        <ScrollView className="w-full">
          <View className={`w-full ${user_type === USERTYPES.EXPERT && showMoreInfo ? "h-2/5" : "h-1/2"}  items-center gap-y-3`}>
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
            <Pressable style={styles.blue_button_sm} onPress={() => handlePress(_id, firstName, isBanned)}>
              <Text style={styles.button_text} className="text-[13px] font-bold">
                {isBanned ? unbanuser_string : banuser_string}
              </Text>
            </Pressable>
          </View>

          {/* MORE INFO SECTION */}
          {showMoreInfo && user_type === USERTYPES.NOVICE ? (
            <View className="p-2 h-1/2 justify-center mt-5">
              <View className="mb-1">
                <Text style={styles.blue_text} className="font-bold text-sm">
                  About:
                </Text>
                <Text className="font-normal text-xs">{about}</Text>
              </View>

              <View className="mb-1">
                <Text style={styles.blue_text} className="font-bold text-sm">
                  Speciality:
                </Text>
                <Text className="font-normal text-xs">{speciality}</Text>
              </View>

              <View className="mb-1">
                <Text style={styles.blue_text} className="font-bold text-sm">
                  Email:
                </Text>
                <Text className="font-normal text-xs">{email}</Text>
              </View>

              <View className="mb-1">
                <Text style={styles.blue_text} className="font-bold text-sm">
                  Spoken Languages:
                </Text>
                <Text className="font-normal text-xs">{spoken_languages}</Text>
              </View>
            </View>
          ) : showMoreInfo && user_type === USERTYPES.EXPERT ? (
            <View className="p-2 justify-end h-3/5 mt-3">
              <View className="mb-1">
                <Text style={styles.blue_text} className="font-bold text-sm">
                  About:
                </Text>
                <Text className="font-normal text-xs">{about}</Text>
              </View>

              <View className="mb-1">
                <Text style={styles.blue_text} className="font-bold text-sm">
                  Speciality:
                </Text>
                <Text className="font-normal text-xs">{speciality}</Text>
              </View>

              <View className="mb-1">
                <Text style={styles.blue_text} className="font-bold text-sm">
                  Email:
                </Text>
                <Text className="font-normal text-xs">{email}</Text>
              </View>

              <View className="mb-1">
                <Text style={styles.blue_text} className="font-bold text-sm">
                  Experience Years:
                </Text>
                <Text className="font-normal text-xs">{yearsOfExperience}</Text>
              </View>

              <View className="mb-3">
                <Text style={styles.blue_text} className="font-bold text-sm">
                  Available Right now:
                </Text>
                <Text className="font-normal text-xs">{isAvailable ? "Online" : "Offline"}</Text>
              </View>

              <View className="mb-1">
                <Text style={styles.blue_text} className="font-bold text-sm">
                  Reviews Average:
                </Text>
                <Text className="font-normal text-xs">{reviews_average}.0</Text>
              </View>

              <View>
                <Text style={styles.blue_text} className="font-bold text-sm">
                  Score:
                </Text>
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
