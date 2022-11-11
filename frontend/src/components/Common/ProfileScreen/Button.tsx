import { View, Text, Pressable } from "react-native";
//internal imports
import styles from "../../../../styles";
import { ButtonComponentProps } from "../types";

const Button: React.FC<ButtonComponentProps> = ({ button_style, title, handlePress }) => {
  let current_style;
  if (button_style === "md") current_style = styles.blue_button_md;
  else if (button_style === "sm") current_style = styles.blue_button_sm;

  return (
    <Pressable style={current_style} onPress={handlePress}>
      <Text className="text-white font-bold text-sm">{title}</Text>
    </Pressable>
  );
};

export default Button;
