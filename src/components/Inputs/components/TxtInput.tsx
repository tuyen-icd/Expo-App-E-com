import { TextInput } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { BaseProps } from './BaseProps';
import { styles } from './styles';
import ContainerTextInput from '../ContainerTextInput';
import { AppEComm } from '../../../constants/colors';

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
    iconEmail?: boolean;
    style?: any;
}

const TxtInput: FC<TxtInputProps> = ({
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
    const [isFocusedState, setIsFocusedState] = useState(false);
    const [errorState, setErrorState] = useState(null);

    useEffect(() => {
        setErrorState(error);
    }, [error]);

    return (
        <ContainerTextInput
            error={errorState}
            valueIsNotEmpty={valueIsNotEmpty}
            isFocused={isFocusedState}
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
                editable={!disable} //Nếu false, văn bản không thể chỉnh sửa. Giá trị mặc định là true.
                multiline={false} //Nếu true, văn bản nhập vào có thể là nhiều dòng. Giá trị mặc định là false.
                blurOnSubmit={true}
                value={value}
                onBlur={() => {
                    setIsFocusedState(false);
                    if (onBlur) {
                        onBlur();
                    }
                }}
                onFocus={() => {
                    setIsFocusedState(true);
                    onFocusTxtInput ? onFocusTxtInput() : null;
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
                keyboardType={keyboardType} //Xác định bàn phím nào sẽ mở, ví dụ: numeric.
                returnKeyType={returnKeyType} //Xác định giao diện của phím quay lại.(Done, go, next, search, send)
                maxLength={maxLength}
            />
        </ContainerTextInput>
    );
};

export default TxtInput;
