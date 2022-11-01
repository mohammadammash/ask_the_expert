import { View, Image } from "react-native";
//internal imports
import { COLORS } from "../../../constants";
import { ProfileImageCardProps } from "../types";


const ProfileImageCard: React.FC<ProfileImageCardProps> = ({ profile_url }) => {
  return (
    <View className="h-52 w-full items-center justify-center">
      <View style={{ borderColor: COLORS.blue }} className="avatar aspect-square rounded-full items-center w-2/3 my-2 h-3/4 border-8">
        <Image className="max-w-full max-h-full h-full w-full rounded-full" source={profile_url} />
      </View>
    </View>
  );
};

export default ProfileImageCard;
