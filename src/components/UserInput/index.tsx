import React, { FC } from "react";
import { BaseProps } from "./BaseProps";
import { TxtInput, TxtInputProps } from "./TextInput";
import { TxtArea, TxtAreaProps } from "./TextArea";

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

}


export default UserInput;