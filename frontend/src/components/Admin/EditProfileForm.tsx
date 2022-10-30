import { View, Text, Pressable, TextInput, Image, Button } from "react-native";
import { useState } from "react";
import { Formik } from "formik";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";
//internal imports:
import styles from "../../../styles";
import commonStyles from "../Common/common.styles";
import { IMAGES, APP_LANGUAGES_OPTIONS, APP_THEME_OPTIONS } from "../../constants";
import { validateEditProfileFormSchema, editProfileInitialValues } from "./helpers/editProfileFormHelper";
import { uploadImageAsync, pickImage } from "../Auth/helpers/registerImageHandlerHelper";

const EditProfileForm = () => {
  const [image, setImage] = useState(''); //set default value as use image_url
  const [appLanguage, setAppLanguage] = useState(null);
  const [isAppLanguageFocus, setIsAppLanguageFocus] = useState(false);
  //app_theme_input
  const [appTheme, setAppTheme] = useState(null);
  const [isAppThemeFocus, setAppThemeFocus] = useState(false);
  //currentUser
  const { user, setUser } = useContext(UserContext);
  const { email } = user;

  return (
    <Formik
      initialValues={editProfileInitialValues}
      onSubmit={async (values, actions) => {
        if (image) {
          const profileimage_url = await uploadImageAsync(image, email);
          setImage(profileimage_url);
          values.profile_url = image;
        }
        alert(JSON.stringify(values, null, 2));
      }}
      validationSchema={validateEditProfileFormSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
        <View className="w-4/5 justify-center">
          <View className="items-center mb-3 ">
            <View className="border-2 rounded-full h-36 w-36">
              <Image className="rounded-full h-full w-full" source={image ? { uri: image } : IMAGES.dummyProfile} />
            </View>
            <Button title="Pick an image from camera roll" onPress={() => pickImage(setImage)} />
          </View>

          <View>
            <Text className="font-bold">Firstname</Text>
            <TextInput
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
              style={styles.text_input}
              className="placeholder:pl-3"
              placeholder="Firstname"
            />
            {errors.firstName && touched.firstName && <Text className="text-red-600">{errors.firstName}</Text>}
          </View>

          <View className="mt-2 w-full">
            <Text className="font-bold">LastName</Text>
            <TextInput onChangeText={handleChange("lastName")} onBlur={handleBlur("lastName")} value={values.lastName} style={styles.text_input} className="placeholder:pl-3" placeholder="Lastname" />
            {errors.lastName && touched.lastName && <Text className="text-red-600">{errors.lastName}</Text>}
          </View>

          <View className="mt-2">
            <Text className="font-bold">App Language</Text>
            <Dropdown
              style={commonStyles.edit_dropdown}
              placeholderStyle={commonStyles.edit_placeholderStyle}
              selectedTextStyle={commonStyles.edit_selectedTextStyle}
              inputSearchStyle={commonStyles.inputSearchStyle}
              iconStyle={commonStyles.edit_iconStyle}
              data={APP_LANGUAGES_OPTIONS}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isAppLanguageFocus ? "English" : "..."}
              searchPlaceholder="Search..."
              value={appLanguage}
              onFocus={() => setIsAppLanguageFocus(true)}
              onBlur={() => setIsAppLanguageFocus(false)}
              onChange={(item) => {
                setAppLanguage(item.value);
                values.language = item.value;
                setIsAppLanguageFocus(false);
              }}
              renderLeftIcon={() => <AntDesign style={commonStyles.edit_iconStyle} color={isAppLanguageFocus ? "blue" : "black"} name="Safety" size={20} />}
            />
          </View>

          <View className="mt-2">
            <Text className="font-bold">App Theme</Text>
            <Dropdown
              style={commonStyles.edit_dropdown}
              placeholderStyle={commonStyles.edit_placeholderStyle}
              selectedTextStyle={commonStyles.edit_selectedTextStyle}
              inputSearchStyle={commonStyles.inputSearchStyle}
              iconStyle={commonStyles.edit_iconStyle}
              data={APP_THEME_OPTIONS}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isAppThemeFocus ? "White" : "..."}
              searchPlaceholder="Search..."
              value={appTheme}
              onFocus={() => setAppThemeFocus(true)}
              onBlur={() => setAppThemeFocus(false)}
              onChange={(item) => {
                setAppTheme(item.value);
                values.theme = item.value;
                setAppThemeFocus(false);
              }}
              renderLeftIcon={() => <AntDesign style={commonStyles.edit_iconStyle} color={isAppThemeFocus ? "blue" : "black"} name="Safety" size={20} />}
            />
          </View>

          <Pressable className="my-7" style={styles.blue_button_xl} onPress={handleSubmit}>
            <Text className="text-xl text-white font-bold">SUBMIT</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default EditProfileForm;
