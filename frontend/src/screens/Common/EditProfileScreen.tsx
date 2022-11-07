import { View, ScrollView } from "react-native";
import { useContext, useState } from "react";
import { UserContext } from "../../hooks/UserContext";
//internal imports
import { EditProfileFormComponent, EditAdminProfileFormComponent } from "../../components";
import { USERTYPES } from "../../constants";
import { pickImage, uploadImageAsync } from "../Helpers/ImageHandlerHelper";

const EditProfileScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const { user_type, email } = user;

  type EditAdminProfileFormValues = {
    firstName: string;
    lastName: string;
    profile_url: string;
    language: string;
    theme: string;
  };

  //---START OF HANDLE FORM---//
  const handleSubmitForm = async (values: EditAdminProfileFormValues) => {
    if (image) {
      const profileimage_url = await uploadImageAsync(image, email);
      setImage(profileimage_url);
      values.profile_url = image;
    }
    alert(JSON.stringify(values, null, 2));
  };

  //image
  const [image, setImage] = useState("");
  const updateImage = (image: any) => setImage(image);
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

  // SPECIFIC USER FORM DATA:

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
    user_type,
  };

  const userDataProps = {
    ...adminDataProps,
    selectedLanguages,
    handleSelectedLanguages,
  };

  return (
    <ScrollView>
      <View className="flex-1 items-center justify-center">
        {user_type === USERTYPES.ADMIN ? <EditProfileFormComponent {...adminDataProps} /> : <EditProfileFormComponent {...userDataProps} />}
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;
