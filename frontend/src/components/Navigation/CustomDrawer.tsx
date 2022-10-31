import { ImageBackground, StyleSheet, Image, View, Dimensions } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
//internal imports
import { COLORS, IMAGES } from "../../constants";
import navigationStyles from "./navigation.styles";

const CustomDrawer = (props: DrawerContentComponentProps): JSX.Element => {
  return (
    // drawer whole content
    <DrawerContentScrollView {...props}>
      <ImageBackground className="h-36" source={IMAGES.fakeMapImage}>
        <Image source={IMAGES.dummyProfile} style={navigationStyles.userImg} />
      </ImageBackground>
      <View style={navigationStyles.drawerListWrapper}>
        {/* drawer items */}
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

