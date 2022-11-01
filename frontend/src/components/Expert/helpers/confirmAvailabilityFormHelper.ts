import * as Yup from "yup";
import { FormValuesTypes } from "../types";

export const availabilityIntialValues: FormValuesTypes = {
    meetings_time: "",
    single_session_time: "",
    //should get current location longitude and latitude and send them with to the db
};

export const validateSetAvailabilityForm = Yup.object().shape({
    meetings_time: Yup.string().required('Required'),
    single_session_time: Yup.string().required('Required'),
});
         