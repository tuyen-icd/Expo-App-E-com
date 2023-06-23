import { View, Text, Pressable } from "react-native";
import React, { FC, ReactNode } from "react";
import { BaseProps } from "./components/BaseProps";
import { styles } from "./components/styles";

import { heightPixel, pixelSizeHorizontal } from "../../ultils/scanling";
import _ from "lodash";
import { AppEComm } from "../../constants/colors";

export interface ContainerTextInputProps extends BaseProps {
    children?: ReactNode;
    valueIsNotEmpty?: boolean;
    isFocused?: boolean;
    leftComponent?: any;
    rightComponent?: any;
}

const ContainerTextInput: FC<ContainerTextInputProps> = ({
    error,
    children,
    iconProps = {
        width: 20,
        height: 20,
    },
    containerStyle,
    valueIsNotEmpty,
    isFocused,
    disable,
    leftComponent,
    rightComponent,
    onRightComponentPress,
}) => {
    const getBorderColor = (isFocused: boolean | undefined, error: any) => {
        if (!isFocused) {
            return Boolean(error) ? AppEComm.color.danger : AppEComm.color.grayLight;
        }
        return AppEComm.color.gradientForm;
    };

    return (
        <>
            <View
                style={[
                    styles.userInputWrap,
                    {
                        borderColor: getBorderColor(isFocused, error),
                    },
                    containerStyle,
                ]}
            >
                {Boolean(leftComponent) && (
                    <View style={{ marginStart: pixelSizeHorizontal(14) }}>
                        {leftComponent(valueIsNotEmpty, iconProps)}
                    </View>
                )}
                {children}
                {Boolean(rightComponent) && (
                    <Pressable
                        style={{ marginRight: pixelSizeHorizontal(14) }}
                        onPress={onRightComponentPress}
                    >
                        {rightComponent(iconProps)}
                    </Pressable>
                )}
            </View>
            <View style={{ minHeight: heightPixel(20) }}>
                {Boolean(error) && !_.isEmpty(error) && <Text style={{ color: AppEComm.color.danger, paddingVertical: 5, paddingHorizontal: 10 }}>{error?.message}</Text>}
            </View>
        </>
    );
};

export default ContainerTextInput;
