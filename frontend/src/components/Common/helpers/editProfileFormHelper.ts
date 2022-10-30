import * as Yup from "yup";

export interface editProfileFormValues {
  firstName: string;
  lastName: string;
  about: string;
  speciality: string;
  profile_url: string,
  languages: string[];
  language: string,
  theme: string,
}

export const editProfileInitialValues: editProfileFormValues = {
    firstName: "",
    lastName: "",
    about: "",
    profile_url: "",
    languages: [], //spoken
    speciality: "Software developer",
    language: '',
    theme: '',
  };

export const validateEditProfileFormSchema = Yup.object().shape({
    firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    about: Yup.string().min(20, "Min 20 Characters").max(250, "Too Long").required('Required'),
    languages: Yup.array().min(1, 'At least one language').required('Required')
  });
