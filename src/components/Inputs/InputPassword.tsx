/* eslint-disable react/no-unstable-nested-components */
import React, { FC, useState } from 'react';
import TxtInput, { TxtInputProps } from './components/TxtInput';
import {
  ICPassword,
  ICPasswordActive,
  IcEyeClosed,
  IcEyeOpened,
} from '../../assets/icons';

export interface InputPassWordProps extends TxtInputProps {
  visiblePasswordButton?: boolean;
}

const InputPassword: FC<InputPassWordProps> = (props: {
  visiblePasswordButton?: boolean;
}) => {
  const { visiblePasswordButton } = props;

  const [hidePassword, setHidePassword] = useState(true);

  const passwordButton = (styles: any) => {
    if (visiblePasswordButton === undefined || true) {
      return hidePassword ? (
        <IcEyeClosed {...styles} />
      ) : (
        <IcEyeOpened {...styles} />
      );
    }
  };

  return (
    <TxtInput
      {...props}
      leftComponent={(valueIsNotEmpty, styles) =>
        valueIsNotEmpty ? (
          <ICPasswordActive {...styles} />
        ) : (
          <ICPassword {...styles} />
        )
      }
      rightComponent={passwordButton}
      onRightComponentPress={() => setHidePassword(!hidePassword)}
      secureTextEntry={hidePassword}
    />
  );
};

export default InputPassword;
