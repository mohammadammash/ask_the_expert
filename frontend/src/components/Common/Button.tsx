import { Text, Pressable } from "react-native";
import { useState } from "react";
//internal imports
import styles from "../../../styles";
import { ButtonComponentProps } from "./types";

const Button: React.FC<ButtonComponentProps> = ({ button_style, title, handlePress, route_name, disabled, textcolor_style }) => {
  const [isActive, setIsActive] = useState(false);
  let current_style;
  if (button_style === "md") current_style = styles.blue_button_md;
  else if (button_style === "sm") current_style = styles.blue_button_xs;
  else if (button_style === "lg") current_style = styles.blue_button_lg;

  return (
    <Pressable
      disabled={disabled}
      style={[current_style, isActive && styles.button_click_style]}
      className={disabled ? "opacity-30" : ""}
      onFocus={()=>{

      }}
      onPress={() => {
        setIsActive(true);
        handlePress(route_name);
        setTimeout(() => {
          setIsActive(false);
        }, 300);
      }}
    >
      <Text style={[textcolor_style, isActive && styles.button_click_text_style]} className={`font-bold uppercase text-${button_style}`}>
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;
