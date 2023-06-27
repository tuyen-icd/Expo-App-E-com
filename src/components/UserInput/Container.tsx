import { View, Text, Pressable } from 'react-native'
import React, { FC, ReactNode } from 'react'
import { BaseProps } from './BaseProps';
import { AppEComm } from '../../constants/colors';
import { heightPixel, pixelSizeHorizontal } from '../../ultils/scanling';
import { styles } from './styles';
import _ from 'lodash';

export interface ContainerProps extends BaseProps {
    children?: ReactNode;
    valueIsNotEmpty?: boolean;
    isFocused?: boolean;
}

const ContainerComponent: FC<ContainerProps> = ({
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
    const getBorderColor = (isFocused: any, error: any) => {
        if (!isFocused) {
            return Boolean(error) ? AppEComm.color.red : AppEComm.color.black;
        }
        return AppEComm.color.blue_001;
    };
    return (

        <>
            <View
                style={[
                    styles.userInputWrap,
                    {
                        borderColor: getBorderColor(isFocused, error),
                        backgroundColor: Boolean(error)
                            ? AppEComm.color.white
                            : AppEComm.color.white
                    },
                    containerStyle,
                ]}>
                {Boolean(leftComponent) && (
                    <View style={{ marginStart: pixelSizeHorizontal(14) }}>
                        {leftComponent?.(valueIsNotEmpty, iconProps, disable)}
                    </View>
                )}
                {children}
                {Boolean(rightComponent) && (
                    <Pressable
                        style={{ marginRight: pixelSizeHorizontal(14) }}
                        onPress={onRightComponentPress}>
                        {rightComponent?.(iconProps)}
                    </Pressable>
                )}
            </View>
            <View
                style={{
                    minHeight: heightPixel(20),
                }}>
                {Boolean(error) && !_.isEmpty(error) && (
                    <Text style={styles.errorMessage}>{error.message}</Text>
                )}
            </View>
        </>
    )
}

export default ContainerComponent