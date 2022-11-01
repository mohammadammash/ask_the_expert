export type reviewType = { rating: number, content: string, created_at: number };
type ratingContent = { average: number; totalOf5: number; totalOf4: number; totalOf3: number; totalOf2: number; totalOf1: number };

export const calculateReviewsStatsHelper = (reviews: reviewType[], handleRatingType: (rating: ratingContent) => void): void => {
    let sum = 0;
    const length = reviews.length;
    let [totalOf5, totalOf4, totalOf3, totalOf2, totalOf1] = [0,0,0,0,0];
    for (let { rating } of reviews) {
      sum += rating;
      if(rating === 5) totalOf5++;
      else if(rating === 4) totalOf4++;
      else if(rating === 3) totalOf3++;
      else if(rating === 2) totalOf2++;
      else if (rating === 1) totalOf1++;
    }
    const average = Math.round(sum / length);
    handleRatingType({ average, totalOf5, totalOf4, totalOf3, totalOf2, totalOf1 });
  };
