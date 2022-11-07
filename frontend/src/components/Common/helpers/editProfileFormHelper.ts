import * as Yup from "yup";
import { EditProfileFormValuesTypes } from "../types";

//EXPERT OR NOVICE
export const userEditProfileInitialValues: EditProfileFormValuesTypes = {
    firstName: "",
    lastName: "",
    about: "",
    profile_url: "",
    languages: [], //spoken
    speciality: "Software developer",
    language: '',
    theme: '',
  };

export const validateUserEditProfileFormSchema = Yup.object().shape({
    firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    about: Yup.string().min(20, "Min 20 Characters").max(250, "Too Long").required('Required'),
    languages: Yup.array().min(1, 'At least one language').required('Required')
  });

//ADMIN
export const adminEditProfileInitialValues: EditProfileFormValuesTypes = {
  firstName: "",
  lastName: "",
  profile_url: "",
  language: "",
  theme: "",
};

export const validateAdminEditProfileFormSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
});