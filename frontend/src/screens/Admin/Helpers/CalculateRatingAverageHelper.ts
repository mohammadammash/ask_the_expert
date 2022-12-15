import { reviewsType } from "../../../hooks/UserContext";

const CalculateRatingAverageHelper = (reviews: reviewsType[]): number => {
    let sum = 0;
    for (let review of reviews) sum += review.rating;
    return sum / reviews.length ? sum : 0;
}

export default CalculateRatingAverageHelper;