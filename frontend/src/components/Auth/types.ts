export interface RegisterFormValuesTypes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  profile_url: string;
  field: string;
  speciality: string;
  languages: string[];
  start_date: Date;
  about: '',
};

export interface RegisterFormProps {
  firebaseSubmitSignup: (email: string, password: string) => void;
  image: string;
  showImage: () => void;
  emailAlreadyUsed: boolean;
  handleSelectedLanguages: (languages: string[]) => void;
  selectedLanguages: string[];
  handleFormSubmit: (values: any) => void;
}

export interface LoginFormValuesTypes {
  email: string;
  password: string;
}

export interface LoginFormProps {
  inValidCredentials: boolean;
  handleInvalidCredentials: (value: boolean) => void;
  firbaseConfirmLogin: (email: string, password: string) => void;
}