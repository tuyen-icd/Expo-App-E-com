import React, { FC, useEffect, useState } from "react";
import { BaseProps } from "./BaseProps";
import { AppEComm } from "../../constants/colors";
import { TextInput } from "react-native";
import { styles } from "../Inputs/components/styles";
import ContainerComponent from "./Container";

export interface TxtInputProps extends BaseProps {
    secureTextEntry?: any;
    value?: any;
    onFocusTxtInput?: () => void;
    onChangeText?: (text: any) => void;
    keyboardType?: any;
    onSubmitEditing?: (event: any) => void;
    returnKeyType?: any;
    onBlur?: () => void;
    maxLength?: number;
}


export const TxtInput: FC<TxtInputProps> = ({
    error,
    placeholder,
    secureTextEntry,
    containerStyle,
    leftComponent,
    rightComponent,
    onRightComponentPress,
    onChangeText,
    onSubmitEditing,
    onBlur,
    value,
    disable,
    keyboardType,
    returnKeyType,
    onFocusTxtInput,
    maxLength,
}) => {
    const [valueIsNotEmpty, setValueIsNotEmpty] = useState(Boolean(value));
    const [isFocused, setIsFocused] = useState(false);
    const [errorState, setErrorState] = useState(null);

    useEffect(() => {
        setErrorState(error);
    }, [error]);

    return (
        <ContainerComponent
            error={errorState}
            valueIsNotEmpty={valueIsNotEmpty}
            isFocused={isFocused}
            leftComponent={leftComponent}
            rightComponent={rightComponent}
            containerStyle={containerStyle}
            disable={disable}
            onRightComponentPress={onRightComponentPress}>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                placeholderTextColor={AppEComm.color.placeholderColor}
                style={styles.input}
                editable={!disable}
                multiline={false}
                blurOnSubmit={true}
                value={value}
                onBlur={() => {
                    setIsFocused(false);
                    if (onBlur) onBlur();
                }}
                onFocus={() => {
                    setIsFocused(true);
                    onFocusTxtInput && onFocusTxtInput();
                }}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                onChangeText={text => {
                    setErrorState(null);
                    setValueIsNotEmpty(text !== '');
                    if (onChangeText) {
                        onChangeText(text);
                    }
                }}
                onSubmitEditing={onSubmitEditing}
                keyboardType={keyboardType}
                returnKeyType={returnKeyType}
                maxLength={maxLength}
            />
        </ContainerComponent>
    );
};
