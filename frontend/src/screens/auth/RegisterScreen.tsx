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

const RegisterScreen = () => {
  //REACT QUERY POST
  const { setUser } = useUserContext();
  const { mutate: mutateRegisterUser, isLoading: mutateRegisterUserIsLoading, data: mutateRegisterUserData } = useRegisterUser();
  useEffect(() => {
    if (mutateRegisterUserData && !mutateRegisterUserIsLoading) {
      alert(JSON.stringify(mutateRegisterUserData.data, null, 2));
      setUser(mutateRegisterUserData.data);
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
        if (image) {
          setImageUploadingToFirebaseStorage(true);
          const profileimage_url = await uploadImageAsync(image, email);
          setImage(profileimage_url);
        }
        return user.uid;
      })

      .catch((error) => {
        if (error.code == "auth/email-already-in-use") {
          alert("Email already in use");
          setEmailAlreadyUsed(true);
        }
      });
  };

  //SUBMIT FORM
  const handleFormSubmit = async (values: RegisterFormValuesTypes) => {
    //if image exists update profile_url to firebase storage image url
    values.profile_url = image ? image : " ";
    //login user to firebase and get uid back
    const _id = await firebaseSubmitSignup(values.email, values.password);
    if (!_id) return;
    //remove unnecessary data
    let { confirmPassword, languages, ...data } = values;
    const spoken_languages = languages.join(" ");
    //Start of get device token
    const device_token = "device_tokenito";
    //End of get device token
    setImageUploadingToFirebaseStorage(false);
    const user_data = { ...data, _id, spoken_languages, device_token };
    alert(JSON.stringify(user_data, null, 2));
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
