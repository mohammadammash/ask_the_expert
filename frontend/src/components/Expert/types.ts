export interface FormValuesTypes {
  meetings_time: string;
  single_session_time: string;
}

type ReviewContentType = {
     rating: number, content: string, created_at: number, 
}
type RatingContentType = { average: number; totalOf5: number; totalOf4: number; totalOf3: number; totalOf2: number; totalOf1: number };

export interface AllReviewsStatsProps {
  reviews: ReviewContentType[],
  rating: RatingContentType,
}

export interface ReviewCardProps {
  navigateToPage: (routeName: string) => any;
  review: {
    rating: number;
    content: string;
    created_at: number;
  };
}

export interface ReviewSingleChatProps {
  progress: number,
  rating: number,
}