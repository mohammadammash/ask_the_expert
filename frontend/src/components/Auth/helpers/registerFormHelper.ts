import * as Yup from "yup";
import { RegisterFormValuesTypes } from "../types";

export const registerInitialValues: RegisterFormValuesTypes = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  profile_url: "",
  field: "Information Technology",
  languages: [],
  speciality: "Software developer",
  start_date: new Date(),
  about: '',
};


export const validateRegisterFormSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  email: Yup.string().email("Please enter valid email").required("Required"),
  password: Yup.string()
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
    .min(6, 'At Least 6 Characters')
    .required("Required"),
  confirmPassword: Yup.string()
    .required("Required")
    .test("password-match", "Password must match", function (value) {
      return this.parent.password === value;
    }),
  languages: Yup.array().min(1, 'At least one language').required('Required'),
  about: Yup.string().min(20, "Min 20 Characters").max(250, "Too Long").required('Required'),
});