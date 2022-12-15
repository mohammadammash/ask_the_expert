import { userType } from "../../hooks/UserContext";

export interface AddReviewButtonSectionProps {
  modalRef: React.MutableRefObject<undefined>; //useRef
};

export interface AddReviewModalFormProps {
  modalRef: React.MutableRefObject<undefined>;
  handleRatingSubmit: (values: { rating: number, content: string }) => void
}
export interface RatingFormValuesTypes {
  content: string;
  rating: number;
}

export interface HomeUserCardProps {
  shown_user: userType,
  handleShowExpert: () => void,
}

//START OF BOOK APPOINTMENT
type AppointmentValuesType = {
  label: string;
  appointment_id: string,
};

export interface BookFormValuesTypes {
  notes: string;
  appointment_id: string,
}

export interface BookAppointmentFormCardProps {
  selectedAppointmentId: string;
  handleSubmitButtonTouched: (value: boolean) => void;
  data: AppointmentValuesType[];
  handleSubmitAppointmentId: (value: string) => void;
  submitButtonTouched: boolean;
  handleFormSubmit: (values: BookFormValuesTypes) => void;
  colorScheme: string;
  textcolor_style: {
    color: string;
  }
}
//END OF BOOK APPOINTMENT
