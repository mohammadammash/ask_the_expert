import * as Yup from "yup";

export interface registerFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  profile_base64: string;
  field: string;
  speciality: string;
  languages: string[];
  start_date: Date;
}

export const registerInitialValues: registerFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile_base64: "",
    field: "Information Technology",
    languages: [],
    speciality: "Software developer",
    start_date: new Date(),
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
      .min(6,'At Least 6 Characters')
      .required("Required"),
    confirmPassword: Yup.string()
      .required("Required")
      .test("password-match", "Password must match", function (value) {
        return this.parent.password === value;
      }),
    languages: Yup.array().min(1, 'At least one language').required('Required')
  });