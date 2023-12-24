import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  widthPixel,
} from "../../ultils/scanling";
import { LinearGradient } from "expo-linear-gradient";
import { AppEComm } from "../../constants/colors";

enum ButtonSizeEnum {
  "Small",
  "Medium",
  "Large",
}

interface ButtonProps {
  buttonSize?: string;
  text: string;
  textStyle?: any;
  iconStyles?: any;
  buttonStyles?: any;
  onPress?: () => void;
  leftComponent?: (iconStyles: any) => any;
  children?: JSX.Element | JSX.Element[];
  containerStyle?: any;
  linearGradient?: any;
}

const Button: FC<ButtonProps> = ({
  text,
  textStyle,
  children,
  buttonSize = ButtonSizeEnum.Large,
  iconStyles = { width: 20, height: 20 },
  buttonStyles,
  leftComponent,
  onPress,
  containerStyle,
  linearGradient,
}) => {
  const largeHeight = heightPixel(60);
  const largeWidth = widthPixel(44);
  return (
    <View style={[styles.btnWrapper, containerStyle]}>
      <LinearGradient
        colors={
          !linearGradient
            ? [AppEComm.color.blue_001, AppEComm.color.blue_001]
            : ["transparent", "transparent"]
        }
        style={styles.linearGradient}
        start={{ y: 0.0, x: 0.0 }}
        end={{ y: 1.0, x: 0.0 }}
      >
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          style={styles.buttonStyle}
        >
          <View
            style={[
              styles.baseButton,
              { height: buttonSize === "Large" ? largeHeight : largeWidth },
              buttonStyles,
            ]}
          >
            {leftComponent ? (
              <View
                style={{
                  marginStart: pixelSizeHorizontal(14),
                  backgroundColor: "red",
                }}
              >
                {leftComponent(iconStyles)}
              </View>
            ) : null}
            {children ? (
              children
            ) : (
              <View style={styles.textWrap}>
                <Text style={[styles.baseTextButton, textStyle]}>{text}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  baseButton: {
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  baseTextButton: {
    fontSize: fontPixel(14),
    color: AppEComm.color.white,
    fontWeight: "700",
    lineHeight: 18,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  textWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    width: "100%",
    borderRadius: 5,
  },
  buttonStyle: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 55,
  },

  btnWrapper: {
    width: "100%",
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
});
