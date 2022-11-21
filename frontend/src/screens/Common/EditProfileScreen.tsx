import { View, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../hooks/UserContext";
import { useColorScheme } from "nativewind";
import { useNavigation } from "@react-navigation/native";
//internal imports
import { ActivityIndicatorComponent, EditProfileFormComponent } from "../../components";
import { USERTYPES } from "../../constants";
import { pickImage, uploadImageAsync } from "../Helpers/ImageHandlerHelper";
import styles from "../../../styles";
import { useUpdateUser } from "../../hooks/useUser";

const EditProfileScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const { user_type, email, app_language, theme, spoken_languages } = user;
  const navigation = useNavigation<any>();

  //theme
  const { colorScheme } = useColorScheme();
  const textcolor_style = colorScheme === "dark" ? styles.grey_text : styles.dark_text;
  const bgcolor_style = colorScheme === "dark" ? styles.bg_dark : styles.bg_white;

  type EditAdminProfileFormValues = {
    firstName: string;
    lastName: string;
    profile_url: string;
    language: string;
    theme: string;
  };

  //intiate values
  useEffect(() => {
    if (user) {
      handleAppLanguage(app_language);
      handleAppTheme(theme);
      handleSelectedLanguages(spoken_languages.split(" "));
    }
  }, [user]);

  //---START OF HANDLE FORM SUBMIT---//
  const { data: mutateUpdateUserData, mutate: mutateUpdateUser, isSuccess: isSuccessUpdateUser, isLoading: isLoadingUpdateUser } = useUpdateUser();
  const [imageIsGettingUploaded, setImageIsGettingUploaded] = useState(false);
  const handleSubmitForm = async (values: EditAdminProfileFormValues) => {
    if (image) {
      setImageIsGettingUploaded(true);
      const profileimage_url = await uploadImageAsync(image, email);
      setImage(profileimage_url);
      values.profile_url = image;
    }
    //Expert or novice edit profile
    if (user_type !== USERTYPES.ADMIN) {
      let { languages, ...data } = values;
      const spoken_languages = languages.join(" ");
      mutateUpdateUser({ ...data, spoken_languages });
    } else {
      mutateUpdateUser(values);
    }
    setImageIsGettingUploaded(false);
  };

  useEffect(() => {
    if (isSuccessUpdateUser) {
      setUser({ ...mutateUpdateUserData.data });
      navigation.goBack();
    }
  }, [isSuccessUpdateUser]);
  //---END OF HANDLE FORM SUBMIT---//

  //image
  const [image, setImage] = useState("");
  const showImage = async () => {
    const newImage = await pickImage();
    setImage(newImage);
  };

  // spoken languages
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const handleSelectedLanguages = (languages: string[]) => {
    setSelectedLanguages(languages);
  };

  //app language
  const [appLanguage, setAppLanguage] = useState(null);
  const [isAppLanguageFocus, setIsAppLanguageFocus] = useState(false);
  const handleAppLanguage = (language: any) => {
    setAppLanguage(language);
  };
  const focusAppLanguage = (isFocused: boolean) => {
    setIsAppLanguageFocus(isFocused);
  };

  //app theme
  const [appTheme, setAppTheme] = useState(null);
  const [isAppThemeFocus, setAppThemeFocus] = useState(false);
  const handleAppTheme = (theme: any) => {
    setAppTheme(theme);
  };
  const focusAppTheme = (isFocused: any) => {
    setAppThemeFocus(isFocused);
  };
  //---END OF HANDLE FORM---//

  //PARAMETERS
  const adminDataProps = {
    image,
    showImage,
    appLanguage,
    isAppLanguageFocus,
    handleAppLanguage,
    focusAppLanguage,
    appTheme,
    isAppThemeFocus,
    handleAppTheme,
    focusAppTheme,
    handleSubmitForm,
    user,
    textcolor_style,
    bgcolor_style,
  };
  const userDataProps = {
    ...adminDataProps,
    selectedLanguages,
    handleSelectedLanguages,
  };

  //Loading update state
  if (isLoadingUpdateUser || imageIsGettingUploaded) {
    return <ActivityIndicatorComponent color={textcolor_style.color} bgcolor_style={bgcolor_style} textcolor_style={textcolor_style}/>;
  }

  return (
    <ScrollView style={bgcolor_style}>
      <View style={bgcolor_style} className="flex-1 items-center justify-center py-3">
        {user_type === USERTYPES.ADMIN ? <EditProfileFormComponent {...adminDataProps} /> : <EditProfileFormComponent {...userDataProps} />}
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;
