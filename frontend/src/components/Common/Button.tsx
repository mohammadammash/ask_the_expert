import { View, Text, Pressable } from "react-native";
//internal imports
import styles from "../../../styles";
import { ButtonComponentProps } from "./types";

const Button: React.FC<ButtonComponentProps> = ({ button_style, title, handlePress, route_name, disabled }) => {
  let current_style;
  if (button_style === "md") current_style = styles.blue_button_md;
  else if (button_style === "sm") current_style = styles.blue_button_xs;
  else if (button_style === "lg") current_style = styles.blue_button_lg; 

  return (
    <Pressable disabled={disabled} style={current_style} className={disabled ? "opacity-30" : ""} onPress={() => handlePress(route_name)}>
      <Text className={`text-white font-bold text-${button_style}`}>{title}</Text>
    </Pressable>
  );
};

export default Button;
