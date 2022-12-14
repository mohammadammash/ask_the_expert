import { View, Text, Pressable, TextInput, Image, Button } from "react-native";
import { Formik } from "formik";
import { MultiSelect, Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Picker } from "@react-native-picker/picker";
//internal imports:
import styles from "../../../styles";
import authStyles from "../Auth/auth.styles";
import { IMAGES, USERTYPES, COLORS } from "../../constants";
import { ALLJOBSSPECIALTIES, APP_LANGUAGES_OPTIONS, APP_THEME_OPTIONS } from "../../constants";
import {
  userEditProfileInitialValues,
  adminEditProfileInitialValues,
  validateAdminEditProfileFormSchema,
  validateUserEditProfileFormSchema,
} from "./Helpers/EditProfileFormHelper";
import { ALLANGUAGES } from "../../constants";
import commonStyles from "./common.styles";
import { EditProfileFormProps } from "./types";
import { t } from "i18next";
import ButtonComponent from "./Button";

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  user,
  image,
  showImage,
  isAppLanguageFocus,
  appLanguage,
  handleAppLanguage,
  focusAppLanguage,
  appTheme,
  isAppThemeFocus,
  handleAppTheme,
  focusAppTheme,
  handleSubmitForm,
  selectedLanguages,
  handleSelectedLanguages,
  textcolor_style,
  bgcolor_style,
}) => {
  //Intiate values another than Formik intial ones
  const { user_type, profile_url } = user;

  //translation
  const firstname_string = t("firstname");
  const lastname_string = t("lastname");
  const about_string = t("about");
  const speciality_string = t("speciality");
  const spokenlanguages_string = t("spoken languages");
  const applanguage_string = t("app language");
  const apptheme_string = t("app theme");
  const submit_string = t("submit");
  const selectspokenlanguages_string = t("Select Spoken Languages");
  const pickimage_string = t("Pick an image from camera roll");

  return (
    <Formik
      initialValues={user_type === USERTYPES.ADMIN ? adminEditProfileInitialValues(user) : userEditProfileInitialValues(user)}
      onSubmit={async (values) => {
        handleSubmitForm(values);
      }}
      validationSchema={user_type === USERTYPES.ADMIN ? validateAdminEditProfileFormSchema : validateUserEditProfileFormSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
        <View style={bgcolor_style} className="w-4/5 justify-center">
          <View className="items-center">
            <View style={styles.border_blue} className="border-4 rounded-full h-36 w-36 mb-3">
              <Image
                className="rounded-full h-full w-full"
                source={image ? { uri: image } : (profile_url.length>1 ? { uri: profile_url } : IMAGES.dummyProfile)}
              />
            </View>
            <Button title={pickimage_string} onPress={showImage} />
          </View>

          <View className="mt-3">
            <Text style={textcolor_style} className="font-bold capitalize">
              {firstname_string}
            </Text>
            <TextInput
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
              className="placeholder:pl-3"
              placeholder="Firstname"
              style={[styles.text_input, , textcolor_style, textcolor_style.color === COLORS.grey && styles.border_grey]}
              placeholderTextColor={textcolor_style.color}
            />
            {errors.firstName && touched.firstName && <Text className="text-red-600">{errors.firstName}</Text>}
          </View>

          <View className="mt-2 w-full">
            <Text style={textcolor_style} className="font-bold capitalize">
              {lastname_string}
            </Text>
            <TextInput
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
              placeholderTextColor={textcolor_style.color}
              className=" placeholder:pl-3 h-20 border-2 rounded-lg"
              style={[styles.text_input, textcolor_style, textcolor_style.color === COLORS.grey && styles.border_grey]}
              placeholder="Lastname"
            />
            {errors.lastName && touched.lastName && <Text className="text-red-600">{errors.lastName}</Text>}
          </View>

          {/* FOR EXPERTS AND NOVICES ONLY */}
          {user_type !== USERTYPES.ADMIN ? (
            <>
              <View className="mt-2">
                <Text style={textcolor_style} className="font-bold capitalize">
                  {about_string}
                </Text>
                <TextInput
                  onChangeText={handleChange("about")}
                  onBlur={handleBlur("about")}
                  value={values.about}
                  className=" placeholder:pl-3 h-20 border-2 rounded-lg"
                  style={[textcolor_style, textcolor_style.color === COLORS.grey && styles.border_grey]}
                  placeholder="About"
                  placeholderTextColor={textcolor_style.color}
                  multiline={true}
                  numberOfLines={10}
                />
                {errors.about && touched.about && <Text className="text-red-600">{errors.about}</Text>}
              </View>

              <View>
                <Text style={textcolor_style} className="mt-2 font-bold bold capitalize">
                  {speciality_string}
                </Text>
                <View style={[styles.select_input, textcolor_style.color === COLORS.grey && styles.border_grey]}>
                  <Picker
                    style={textcolor_style.color === COLORS.grey && textcolor_style}
                    enabled={true}
                    mode="dropdown"
                    placeholder="Select Field"
                    selectedValue={values.speciality}
                    onValueChange={handleChange("speciality")}
                  >
                    {ALLJOBSSPECIALTIES.map((job, index) => (
                      <Picker.Item label={job} value={job} key={index} />
                    ))}
                  </Picker>
                </View>
              </View>

              <Text style={textcolor_style} className="font-bold capitalize">
                {spokenlanguages_string}
              </Text>
              <View style={[textcolor_style.color === COLORS.grey && styles.border_grey]} className="border-2 rounded-lg pl-1">
                <MultiSelect
                  style={authStyles.dropdown}
                  placeholderStyle={[authStyles.placeholderStyle, textcolor_style.color === COLORS.grey && commonStyles.edit_placeholder_dark]}
                  selectedTextStyle={authStyles.selectedTextStyle}
                  inputSearchStyle={authStyles.inputSearchStyle}
                  iconStyle={authStyles.iconStyle}
                  search
                  data={ALLANGUAGES}
                  labelField="label"
                  valueField="value"
                  placeholder={selectspokenlanguages_string}
                  searchPlaceholder="Search..."
                  value={selectedLanguages}
                  onChange={(item) => {
                    if (handleSelectedLanguages) handleSelectedLanguages(item);
                    values.languages = item;
                  }}
                  renderLeftIcon={() => <AntDesign color="black" name="Safety" size={20} />}
                  selectedStyle={authStyles.selectedStyle}
                />
                {errors.languages && touched.languages && <Text className="text-red-600  ">{errors.languages}</Text>}
              </View>
            </>
          ) : null}
          {/* END OF NOVICES && EXPERTS ONLY */}

          <View className="mt-2">
            <Text style={textcolor_style} className="font-bold capitalize">
              {applanguage_string}
            </Text>
            <Dropdown
              style={[commonStyles.edit_dropdown, textcolor_style.color === COLORS.grey && styles.border_grey]}
              placeholderStyle={[commonStyles.edit_placeholderStyle, textcolor_style.color === COLORS.grey && commonStyles.edit_placeholder_dark]}
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
              onFocus={() => focusAppLanguage(true)}
              onBlur={() => focusAppLanguage(false)}
              onChange={(item) => {
                handleAppLanguage(item.value);
                values.app_language = item.value;
                focusAppLanguage(false);
              }}
              renderLeftIcon={() => (
                <AntDesign style={commonStyles.edit_iconStyle} color={isAppLanguageFocus ? "blue" : "black"} name="Safety" size={20} />
              )}
            />
          </View>

          <View className="mt-2 mb-5">
            <Text style={textcolor_style} className="font-bold capitalize">
              {apptheme_string}
            </Text>
            <Dropdown
              style={[commonStyles.edit_dropdown, textcolor_style.color === COLORS.grey && styles.border_grey]}
              placeholderStyle={[commonStyles.edit_placeholderStyle, textcolor_style.color === COLORS.grey && commonStyles.edit_placeholder_dark]}
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
              onFocus={() => focusAppTheme(true)}
              onBlur={() => focusAppTheme(false)}
              onChange={(item) => {
                handleAppTheme(item.value);
                values.theme = item.value;
                focusAppTheme(false);
              }}
              renderLeftIcon={() => (
                <AntDesign style={commonStyles.edit_iconStyle} color={isAppThemeFocus ? "blue" : "black"} name="Safety" size={20} />
              )}
            />
          </View>

          <ButtonComponent button_style="xl" route_name="" title={submit_string} handlePress={() => handleSubmit()} disabled={false} />
        </View>
      )}
    </Formik>
  );
};

export default EditProfileForm;
