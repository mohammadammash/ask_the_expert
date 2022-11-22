import * as Yup from "yup";
import { userType } from "../../../hooks/UserContext";

//EXPERT OR NOVICE
export const userEditProfileInitialValues = (user: userType) => {
  const { firstName, lastName, about, profile_url, spoken_languages, app_language, theme, speciality } = user;
  return {
  firstName,
  lastName,
  about,
  profile_url,
  languages: spoken_languages.split(" "), //spoken
  speciality,
  app_language: app_language ? app_language : "english",
  theme: theme ? theme : 'white',
  }
};

export const validateUserEditProfileFormSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  about: Yup.string().min(20, "Min 20 Characters").max(250, "Too Long").required('Required'),
  languages: Yup.array().min(1, 'At least one language').required('Required')
});

//ADMIN
export const adminEditProfileInitialValues = (user: userType) => {
  const {firstName, lastName, profile_url, app_language, theme} = user;
  return {
    firstName: firstName,
    lastName: lastName,
    profile_url: profile_url,
    app_language: app_language ? app_language : "english",
    theme: theme ? theme : 'white',
  }
};

export const validateAdminEditProfileFormSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
});