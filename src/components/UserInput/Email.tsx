import React, { FC } from 'react';
import { TxtInput, TxtInputProps } from './TextInput';
import { ICEmail, ICEmailLight } from '../../assets/icons';

export const Email: FC<TxtInputProps> = ({
    containerStyle,
    placeholder,
    onChangeText,
    value,
    disable,
    error,
    iconEmail,
}) => {
    const getLeftComponent = (valueIsNotEmpty, styles, disable) => {
        if (disable) {
            return <IcEmailDisable {...styles} />;
        }
        if (!iconEmail) {
            return valueIsNotEmpty ? <ICEmailLight {...styles} /> : <ICEmail {...styles} />;
        } else {
            return valueIsNotEmpty ? <ICEmailLight {...styles} /> : <ICEmail {...styles} />;
        }
    };

    return (
        <TxtInput
            value={value}
            onChangeText={onChangeText}
            containerStyle={containerStyle}
            placeholder={placeholder}
            disable={disable}
            leftComponent={() => getLeftComponent(Boolean(value), {}, disable)}
            error={error}
        />
    );
};
