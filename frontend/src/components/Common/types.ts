import { userType } from "../../hooks/UserContext";

export interface ChatAndAppointmentCardProps {
  handleCardClick: (type: string, user: userType) => void,
  data?: any,
  shown_user: userType,
  textcolor_style: {
    color: string
  }
}

export interface EditProfileFormProps {
  user: userType,
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
  textcolor_style: {
    color: string
  },
  bgcolor_style:{
    backgroundColor: string
  }
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

export interface LeaderboardCardProps {
  rank: number;
  expert: userType;
  textcolor_style: {
    color: string
  }
}

export interface ActivityIndicatorProps {
  color: string,
  title?: string,
  bgcolor_style?: {
    backgroundColor: string;
  },
  textcolor_style?: {
    color: string
  }
}

// START OF PROFILESCREEN
export interface AboutSectionProps {
  user_type: string;
  about: string;
  textcolor_style: {
    color: string
  }
}


export interface ButtonComponentProps {
  button_style: string;
  title: string;
  disabled: boolean;
  route_name: string;
  handlePress: (route_name: string) => void;
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
  score?: Number | undefined,
  textcolor_style: {
    color: string,
  }
}
// END OF PROFILESCREEN

