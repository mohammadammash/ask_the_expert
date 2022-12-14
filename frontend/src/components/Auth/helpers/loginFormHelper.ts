import * as Yup from "yup";
import { LoginFormValuesTypes } from "../types";


export const loginIntialValues: LoginFormValuesTypes = {
    email: "",
    password: "",
  };

export const validateLoginFormSchema = Yup.object().shape({
    email: Yup.string().email("Please enter valid email").required("Email is required"),
    password: Yup.string()
      .matches(/\w*[a-z]\w*/, "Password must have a small letter")
      .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
      .matches(/\d/, "Password must have a number")
      .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
      .required("Password is required"),
  });