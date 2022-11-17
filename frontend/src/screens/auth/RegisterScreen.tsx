import { View, ScrollView, ActivityIndicator, Text } from "react-native";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
//internal imports
import { RegisterFormComponent } from "../../components";
import { auth } from "../../../firebaseConfig";
import { useUserContext } from "../../hooks/UserContext";
import { uploadImageAsync, pickImage } from "../Helpers/ImageHandlerHelper";
import { RegisterFormValuesTypes } from "../../components/Auth/types";
import { useRegisterUser } from "../../hooks/useAuth";
import { COLORS } from "../../constants";
import { setDefaultTokens } from "../../networks";
import { useNotifications } from "../../hooks/useNotifications";

const RegisterScreen = () => {
  //REACT QUERY POST
  const { setUser } = useUserContext();
  const { mutate: mutateRegisterUser, isLoading: mutateRegisterUserIsLoading, data: mutateRegisterUserData } = useRegisterUser();
  useEffect(() => {
    if (mutateRegisterUserData && !mutateRegisterUserIsLoading) {
      const { token, ...data } = mutateRegisterUserData.data;
      setDefaultTokens(token);
      setUser(data);
    }
  }, [mutateRegisterUserData]);

  //FORM VALUES
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [emailAlreadyUsed, setEmailAlreadyUsed] = useState(false);
  const [image, setImage] = useState("");
  const [imageUploadingToFirebaseStorage, setImageUploadingToFirebaseStorage] = useState(false); //For Loading indicator reasons
  const showImage = async () => {
    const newImage = await pickImage();
    setImage(newImage);
  };
  const handleSelectedLanguages = (languages: string[]) => setSelectedLanguages(languages);

  //DATE //FOR ANDROID ONLY
  const [dateValue, setDateValue] = useState({ date: new Date(), mode: "date", show: false });

  const updateDateValue = ({ date, mode, show }: { date: Date; mode: string; show: boolean }) => {
    setDateValue({ date, mode, show });
  };

  const onDateChange = (selectedDate: Date) => {
    const currentDate = selectedDate || dateValue.date;
    setDateValue({ ...dateValue, date: currentDate, show: false });
  };

  //REGISTER AUTH
  const firebaseSubmitSignup = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        let imageURL = "";
        if (image) {
          setImageUploadingToFirebaseStorage(true);
          imageURL = await uploadImageAsync(image, email);
        }
        return [user.uid, imageURL];
      })

      .catch((error) => {
        if (error.code == "auth/email-already-in-use") {
          setEmailAlreadyUsed(true);
          return ["", ""];
        }
      });
  };

  //SUBMIT FORM
  const handleFormSubmit = async (values: RegisterFormValuesTypes) => {
    //login user to firebase and get uid back
    const [_id, imageURL] = await firebaseSubmitSignup(values.email, values.password);
    //if image exists update profile_url to firebase storage image url
    if (!_id) return;
    let { confirmPassword, languages, profile_url, ...data } = values;
    profile_url = imageURL ? imageURL : " ";
    const spoken_languages = languages.join(" ");
    //get expo push device token
    const { registerForPushNotificationsAsync } = useNotifications();
    const device_token = await registerForPushNotificationsAsync();
    //End of get device token
    setImageUploadingToFirebaseStorage(false);
    const user_data = { ...data, _id, spoken_languages, profile_url, device_token };
    mutateRegisterUser(user_data);
  };

  //PARAMS
  const data = {
    firebaseSubmitSignup,
    image,
    showImage,
    emailAlreadyUsed,
    handleSelectedLanguages,
    selectedLanguages,
    handleFormSubmit,
    dateValue,
    updateDateValue,
    onDateChange,
  };

  //--------------
  //MAIN COMPONENT
  //If Register isLoading //show loading indicator in middle of screen until user is redirected
  if (mutateRegisterUserIsLoading || imageUploadingToFirebaseStorage) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={COLORS.dark} />
        <Text>It may take some time, we're already there🎉</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View className="items-center mt-3">
        <RegisterFormComponent {...data} />
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
