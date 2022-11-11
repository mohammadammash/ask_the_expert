import { reviewsType as ReviewsType, userType } from "../../hooks/UserContext";
export interface FormValuesTypes {
  meetings_time: number;
  single_session_time: number;
}

type RatingContentType = { average: number; totalOf5: number; totalOf4: number; totalOf3: number; totalOf2: number; totalOf1: number };

export interface AllReviewsStatsProps {
  reviews_length: number,
  rating: RatingContentType,
}

export interface ReviewCardProps {
  handleCardClick: (novice_user: userType) => any;
  review: ReviewsType;
}

export interface ReviewSingleChatProps {
  progress: number,
  rating: number,
}
export interface AvailabilityformValuesTypes {
  meetings_time: number;
  single_session_time: number;
}
export interface ConfirmAvailabilityFormCardProps {

  unmatchedOptions: boolean;
  handleSubmitForm: (values: AvailabilityformValuesTypes) => void;
}