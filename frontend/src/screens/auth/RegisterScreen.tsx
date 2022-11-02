import { View, ScrollView } from "react-native";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
//internal imports
import { RegisterFormComponent } from "../../components";
import { auth } from "../../../firebaseConfig";
import { uploadImageAsync, pickImage } from "../helpers/imageHandlerHelper";
import { RegisterFormValuesTypes } from "../../components/Auth/types";

const RegisterScreen = () => {
  //FORM VALUES
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [emailAlreadyUsed, setEmailAlreadyUsed] = useState(false);
  const [image, setImage] = useState("");
  const showImage = async () => {
    const newImage = await pickImage();
    setImage(newImage);
  };
  const handleSelectedLanguages = (languages: string[]) => setSelectedLanguages(languages);

  //REGISTER AUTH
  const firebaseSubmitSignup = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        if (image) {
          const profileimage_url = await uploadImageAsync(image, email);
          setImage(profileimage_url);
        }
        console.log(user.uid);
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
    if (image) values.profile_url = image;
    await firebaseSubmitSignup(values.email, values.password);
    //do something with values
    alert(values);
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
  };

  return (
    <ScrollView>
      <View className="items-center mt-3">
        <RegisterFormComponent {...data} />
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
