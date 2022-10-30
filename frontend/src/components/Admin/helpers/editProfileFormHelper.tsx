import * as Yup from "yup";

export interface editProfileFormValues {
  firstName: string;
  lastName: string;
  profile_url: string;
  language: string;
  theme: string;
}

export const editProfileInitialValues: editProfileFormValues = {
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