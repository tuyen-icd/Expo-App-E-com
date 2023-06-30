import React, { FC } from "react";
import { BaseProps } from "./BaseProps";
import { TxtInput, TxtInputProps } from "./TextInput";
import { TxtArea, TxtAreaProps } from "./TextArea";
import { Picker, PickerProps } from "./Picker";
import { DatetimePickerProps, BirthDayPicker } from "./BirthDayPicker";
// import { BirthDayPicker, BirthdayPickerProps } from "./BirthDayPicker";

class UserInput extends React.Component<BaseProps>  {
    static TextInput: FC<TxtInputProps> = (props: {
        error?: string;
        isRequire?: any;
        placeholder?: any;
        secureTextEntry?: any;
        leftComponent?: any;
        rightComponent?: any;
        onRightComponentPress?: any;
        containerStyle?: any;
        onChangeText?: any;
        onSubmitEditing?: any;
        value?: any;
        disable?: any;
        returnKeyType?: any;
        onFocusTxtInput?: any;
        maxLength?: any;
    }) => TxtInput(props);

    static TextArea: FC<TxtAreaProps> = (props: {
        error?: any;
        isRequire?: any;
        placeholder?: any;
        containerStyle?: any;
        onChangeText?: any;
        value?: any;
        disable?: any;
    }) => TxtArea(props);

    static Picker: FC<PickerProps> = (props: {
        title?: any;
        leftComponent?: any;
        data?: any;
        containerStyle?: any;
        value?: any;
        onPickedData?: any;
        isWheel?: any;
        linearGradient?: boolean
    }) => Picker(props);

    static BirthDayPicker: FC<DatetimePickerProps> = (props: {
        title?: any;
        mode?: 'time' | 'date' | 'datetime';
        error?: any;
        containerStyle?: any;
        onPickedDate?: any;
        date?: any;
    }) => BirthDayPicker(props);

}


export default UserInput;