import { reviewsType as ReviewsType } from "../../hooks/UserContext";
export interface FormValuesTypes {
  meetings_time: string;
  single_session_time: string;
}

type RatingContentType = { average: number; totalOf5: number; totalOf4: number; totalOf3: number; totalOf2: number; totalOf1: number };

export interface AllReviewsStatsProps {
  reviews_length: number,
  rating: RatingContentType,
}

export interface ReviewCardProps {
  handleCardClick: () => any;
  review: ReviewsType;
}

export interface ReviewSingleChatProps {
  progress: number,
  rating: number,
}