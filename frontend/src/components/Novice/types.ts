export interface AddReviewButtonSectionProps {
  modalRef: React.MutableRefObject<undefined>; //useRef
};

export interface AddReviewModalFormProps {
  modalRef: React.MutableRefObject<undefined>;
}
export interface RatingFormValuesTypes {
  content: string;
  rating: number;
}

export interface HomeUserCardProps {
  navigateToPage: (routeName: string) => any;
}

//START OF BOOK APPOINTMENT
type AppointmentValuesType = {
  label: string;
  start_timestamp: string;
  end_timestamp: string;
};
type SelectedTimeStateType = {
  start_timestamp: string;
  end_timestamp: string;
};

export interface BookFormValuesTypes {
  notes: string;
  start_timestamp: string;
  end_timestamp: string;
}

export interface BookAppointmentFormCardProps {
  selectedTimeStamps: SelectedTimeStateType;
  handleSubmitButtonTouched: (value: boolean) => void;
  data: AppointmentValuesType[];
  handleSubmitTimeStamps: (value: SelectedTimeStateType) => void;
  submitButtonTouched: boolean;
  handleFormSubmit: (values: BookFormValuesTypes) => void;
}
//END OF BOOK APPOINTMENT
