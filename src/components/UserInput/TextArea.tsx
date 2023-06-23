import React, { FC, useState, useEffect } from 'react';
import _ from 'lodash';
import { BaseProps } from './BaseProps';
import { styles } from './styles';
import { TextInput } from 'react-native';
import { AppEComm } from '../../constants/colors';
import ContainerComponent from './Container';

export interface TxtAreaProps extends BaseProps {
    value?: any;
    onFocusTxtInput?: (event: Event) => void;
    onChangeText?: (text: string) => void;
    keyboardType?: any;
}

export const TxtArea: FC<TxtAreaProps> = ({
    error,
    placeholder,
    containerStyle,
    onChangeText,
    value,
    disable,
    keyboardType,
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
            containerStyle={[styles.textArea, containerStyle]}
            disable={disable}>
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                editable={!disable}
                multiline={true}
                blurOnSubmit={true}
                value={value}
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                onChangeText={text => {
                    setErrorState(null);
                    setValueIsNotEmpty(text !== '');
                    if (onChangeText) {
                        onChangeText(text);
                    }
                }}
                placeholderTextColor={AppEComm.color.placeholderColor}
                keyboardType={keyboardType}
            />
        </ContainerComponent>
    );
};
