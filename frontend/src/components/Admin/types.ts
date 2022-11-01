export interface EditProfileFormValuesTypes {
  firstName: string;
  lastName: string;
  profile_url: string;
  language: string;
  theme: string;
}

export interface AdminEditProfileFormProps {
  image: string;
  showImage: () => void;
  isAppLanguageFocus: boolean;
  appLanguage: any;
  handleAppLanguage: (language: any) => void;
  focusAppLanguage: (isFocused: any) => void;
  appTheme: any;
  isAppThemeFocus: boolean;
  handleAppTheme: (theme: any) => void;
  focusAppTheme: (isFocused: any) => void;
  handleSubmitForm: (values: EditProfileFormValuesTypes) => void;
}



export interface FilterPageTitleProps {
  userType: string;
  handleShownUserType: (value: string) => void;
  route_name: string;
}