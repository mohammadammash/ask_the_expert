
export interface ChatAndAppointmentCardProps {
  NavigateToPage: () => void

}

export interface EditProfileFormProps {
  user_type: string;
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
  selectedLanguages?: string[];
  handleSelectedLanguages?: (languages: string[]) => void;
  handleSubmitForm: (values: EditProfileFormValuesTypes) => void;
}

export interface EditProfileFormValuesTypes {
  firstName: string;
  lastName: string;
  about?: string;
  speciality?: string;
  profile_url: string,
  languages?: string[];
  language: string,
  theme: string,
}

//END OF EDIT PROFILE COMPONENT

export interface sendMessageFormProps {
  message: string;
  handleMessageChange: (message: string) => void;
  submitMessage: () => void;
}

// START OF PROFILESCREEN
export interface AboutSectionProps {
  user_type: string;
  about: string;
}

export interface AvailabilitySwitchButtonProps {
  user_type: string;
  online: boolean;
  navigateToPage: (routeName: string) => any;
}

export interface ButtonsComponentProps {
  user_type: string;
  navigateToPage: (routeName: string) => any;
}

export interface ProfileImageCardProps {
  profile_url: string;
}

export interface ProfilePersonalInfoProps {
  firstName: string;
  lastName: string;
  speciality: string;
  field: string;
  yearsOfExperience?: string;
  spoken_languages: string;
}
// END OF PROFILESCREEN

