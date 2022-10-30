import { View, Text, Pressable } from 'react-native'
//internal imports
import styles from '../../../styles';

const UserMoreInfoSection = () => {
  return (
    <View>
      {/* IF NOVICE'S CARD with h-100 */}
      {/* <View className="h-64 p-1 justify-end">
        <View className="mb-1">
          <Text className="font-semibold text-sm">About:</Text>
          <Text className="font-normal text-xs">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas modi ut minima possimus ex illum sint nisi harum ipsam? Incidunt? Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Non facilis quo laudantium voluptatum
          </Text>
        </View>

        <View className="mb-1">
          <Text className="font-semibold text-sm">Field:</Text>
          <Text className="font-normal text-xs">Technology</Text>
        </View>

        <View className="mb-1">
          <Text className="font-semibold text-sm">Email:</Text>
          <Text className="font-normal text-xs">mohamamdammash31@gmail.com</Text>
        </View>

        <View className="mb-1">
          <Text className="font-semibold text-sm">Spoken Languages:</Text>
          <Text className="font-normal text-xs">English, French, Italian</Text>
        </View>
      </View> */}

      {/* IF EXPERT's CARD */}
      {/* <View className="p-1 justify-end">
          <View className="mb-1">
            <Text className="font-semibold text-sm">About:</Text>
            <Text className="font-normal text-xs">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas modi ut minima possimus ex illum sint nisi harum ipsam? Incidunt? Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Non facilis quo laudantium voluptatum
            </Text>
          </View>

          <View className="mb-1">
            <Text className="font-semibold text-sm">Field:</Text>
            <Text className="font-normal text-xs">Technology</Text>
          </View>

          <View className="mb-1">
            <Text className="font-semibold text-sm">Email:</Text>
            <Text className="font-normal text-xs">mohamamdammash31@gmail.com</Text>
          </View>

          <View className="mb-1">
            <Text className="font-semibold text-sm">Experience Years:</Text>
            <Text className="font-normal text-xs">11 Years and 33 months</Text>
          </View>

          <View className="mb-1">
            <Text className="font-semibold text-sm">Available Right now:</Text>
            <Text className="font-normal text-xs">False</Text>
          </View>

          <View className="mb-1">
            <Text className="font-semibold text-sm">Score:</Text>
            <Text className="font-normal text-xs">230 Points</Text>
          </View>
        </View> */}

      {/* IF BANNED = UNBAN BUTTON else BAN */}
      {/* <View className="items-center mt-3">
        <Pressable style={styles.blue_button_sm} onPress={()=>alert('Ban or unBan')}>
          <Text className="text-sm text-white font-bold">UNBAN</Text>
        </Pressable>
      </View> */}
      
    </View>
  );
}

export default UserMoreInfoSection