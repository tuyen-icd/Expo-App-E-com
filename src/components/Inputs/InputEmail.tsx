/* eslint-disable react/no-unstable-nested-components */
import React, { FC } from 'react';
import TxtInput, { TxtInputProps } from './components/TxtInput';
import { ICEmail, ICEmailLight } from '../../assets/icons';

const InputEmail: FC<TxtInputProps> = ({
    containerStyle,
    value,
    error,
    placeholder,
    onChangeText,
}) => {
    return (
        <TxtInput
            value={value}
            onChangeText={onChangeText}
            containerStyle={containerStyle}
            placeholder={placeholder}
            leftComponent={(valueIsNotEmpty, styles) =>
                valueIsNotEmpty ? <ICEmailLight {...styles} /> : <ICEmail {...styles} />
            }
            error={error}
        />
    );
};

export default InputEmail;
