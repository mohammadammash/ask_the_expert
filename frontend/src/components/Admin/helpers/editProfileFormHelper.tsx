import * as Yup from "yup";
import { EditProfileFormValuesTypes } from "../types";

export const editProfileInitialValues: EditProfileFormValuesTypes = {
  firstName: "",
  lastName: "",
  profile_url: "",
  language: "",
  theme: "",
};

export const validateEditProfileFormSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
});
