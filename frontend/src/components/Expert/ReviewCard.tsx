import { View, Text } from 'react-native'
import { reviewType } from './helpers/calculateReviewsStatsHelper'; 

interface ReviewCardProps {
  review: reviewType;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <View>
      <Text>{review.content}</Text>
    </View>
  );
};

export default ReviewCard;