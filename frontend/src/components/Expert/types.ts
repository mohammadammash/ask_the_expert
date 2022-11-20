import { reviewsType as ReviewsType, userType } from "../../hooks/UserContext";
export interface FormValuesTypes {
  meetings_time: number;
  single_session_time: number;
}

type RatingContentType = { average: number; totalOf5: number; totalOf4: number; totalOf3: number; totalOf2: number; totalOf1: number };

export interface AllReviewsStatsProps {
  reviews_length: number,
  rating: RatingContentType,
  handleSearchReviewsChangeText: (text: string) => void,
  userIsSearchingReviews: boolean,
  textcolor_style: {
    color: string
  },
  bgcolor_style: {
    backgroundColor: string,
  }
}

export interface ReviewCardProps {
  handleCardClick: (novice_user: userType) => any;
  review: ReviewsType;
  currentOwner: boolean,
  handleDeleteOwnReview: (review_id: string) => void,
  textcolor_style: {
    color: string
  }
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
  textcolor_style: {
    color: string
  },
  bgcolor_style: {
    backgroundColor: string,
  }
}