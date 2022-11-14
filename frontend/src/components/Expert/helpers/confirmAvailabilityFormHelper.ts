import * as Yup from "yup";
import { FormValuesTypes } from "../types";

export const availabilityIntialValues: FormValuesTypes = {
    meetings_time: 0,
    single_session_time: 0,
    //should get current location longitude and latitude and send them with to the db
};

export const validateSetAvailabilityForm = Yup.object().shape({
    meetings_time: Yup.number().min(15, 'Required').required('Required'),
    single_session_time: Yup.number().min(15, 'Required').max(Yup.ref('meetings_time'), 'Session time should be less than or equal to meetings time!').required('Required'),
});
         
