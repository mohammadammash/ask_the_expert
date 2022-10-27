import { View, Text, Image } from 'react-native'
import { IMAGES, USERTYPES } from '../../constants';
import { UserContext } from '../../hooks/UserContext';
import {useContext} from "react";

const ProfileImageCard = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <View className="border-2 h-1/2 w-full items-center justify-center">
      <View className="avatar aspect-square rounded-full items-center w-1/2 mb-2 h-1/2 border-2">
        <Image className="max-w-full max-h-full h-full w-full rounded-full" source={IMAGES.dummyProfile} />
      </View>

      {/* IF the usertype is expert then he/she is the current profile owner */}
      {user.user_type === USERTYPES.EXPERT &&
      <Text>ProfileImageCard</Text>
      }
    </View>
  );
}

export default ProfileImageCard