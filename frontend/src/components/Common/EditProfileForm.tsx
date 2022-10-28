import { View, Text, Pressable, TextInput, Image, Button } from "react-native";
import { useState } from "react";
import { Formik } from "formik";
import { MultiSelect, Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Picker } from "@react-native-picker/picker";
import { useContext } from "react";
import { UserContext } from "../../hooks/UserContext";
//internal imports:
import styles from "../../../styles";
import authStyles from "../Auth/auth.styles";
import { IMAGES } from "../../constants";
import { ALLJOBSSPECIALTIES } from "../../constants";
import { validateEditProfileFormSchema, editProfileInitialValues, app_languages, app_themes } from "./helpers/editProfileFormHelper";
import { uploadImageAsync, pickImage } from "../Auth/helpers/registerImageHandlerHelper";
import { ALLANGUAGES } from "../../constants";
import commonStyles from "./common.styles";

const EditProfileForm = () => {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [image, setImage] = useState("");
  //app_language_input
  const [appLanguage, setAppLanguage] = useState(null);
  const [isAppLanguageFocus, setIsAppLanguageFocus] = useState(false);
  //app_theme_input
  const [appTheme, setAppTheme] = useState(null);
  const [isAppThemeFocus, setAppThemeFocus] = useState(false);
  //currentUser
  const { user, setUser } = useContext(UserContext);
  const {email} = user;


  return (
    <Formik
      initialValues={editProfileInitialValues}
      onSubmit={async (values, actions) => {
        const profileimage_url = await uploadImageAsync(image, email);
        setImage(profileimage_url);
        values.profile_url = image;
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
            <TextInput
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
              style={styles.text_input}
              className="border-2 rounded-lg"
              placeholder="Lastname"
            />
            {errors.lastName && touched.lastName && <Text className="text-red-600">{errors.lastName}</Text>}
          </View>

          <View className="mt-2">
            <Text className="font-bold">About</Text>
            <TextInput
              onChangeText={handleChange("about")}
              onBlur={handleBlur("about")}
              value={values.about}
              className=" placeholder:pl-3 h-20 border-2 rounded-lg"
              placeholder="About"
              multiline={true}
              numberOfLines={10}
            />
            {errors.about && touched.about && <Text className="text-red-600">{errors.about}</Text>}
          </View>

          <View>
            <Text className="mt-2 font-bold border-b-2 bold">Speciality</Text>
            <Picker style={styles.select_input} enabled={true} mode="dropdown" placeholder="Select Field" selectedValue={values.speciality} onValueChange={handleChange("speciality")}>
              {ALLJOBSSPECIALTIES.map((job, index) => (
                <Picker.Item label={job} value={job} key={index} />
              ))}
            </Picker>
          </View>

          <Text className="font-bold">Spoken Languages</Text>
          <View className="border-2 rounded-lg pl-1">
            <MultiSelect
              style={authStyles.dropdown}
              placeholderStyle={authStyles.placeholderStyle}
              selectedTextStyle={authStyles.selectedTextStyle}
              inputSearchStyle={authStyles.inputSearchStyle}
              iconStyle={authStyles.iconStyle}
              search
              data={ALLANGUAGES}
              labelField="label"
              valueField="value"
              placeholder="Select Spoken Languages"
              searchPlaceholder="Search..."
              value={selectedLanguages}
              onChange={(item) => {
                setSelectedLanguages(item);
                values.languages = item;
              }}
              renderLeftIcon={() => <AntDesign color="black" name="Safety" size={20} />}
              selectedStyle={authStyles.selectedStyle}
            />
            {errors.languages && touched.languages && <Text className="text-red-600  ">{errors.languages}</Text>}
          </View>

          <View className="mt-2">
            <Text className="font-bold">App Language</Text>
            <Dropdown
              style={commonStyles.edit_dropdown}
              placeholderStyle={commonStyles.edit_placeholderStyle}
              selectedTextStyle={commonStyles.edit_selectedTextStyle}
              inputSearchStyle={commonStyles.inputSearchStyle}
              iconStyle={commonStyles.edit_iconStyle}
              data={app_languages}
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
              data={app_themes}
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
