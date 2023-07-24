import React, { FC, useEffect, useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { PickerButton } from './Picker';
import { BaseProps } from './BaseProps';
import { StyleSheet, Text, View } from 'react-native';
import _ from 'lodash';
import { ICDate, ICDateActive, IcArrowDown } from '../../assets/icons';
import { AppEComm } from '../../constants/colors';
import { FormatDatetime } from '../../ultils/formatData';
import { fontPixel, heightPixel } from '../../ultils/scanling';


export interface DatetimePickerProps extends BaseProps {
    title?: string;
    mode?: 'time' | 'date' | 'datetime';
    date?: string;
    onPickedDate?: (date: any) => void;
    disable?: boolean;
    minimumDate?: Date;
}

export const BirthDayPicker: FC<DatetimePickerProps> = ({
    title,
    mode,
    error,
    containerStyle,
    onPickedDate,
    date,
    disable,
    minimumDate,
}) => {
    const [showPicker, setShowPicker] = useState(false);
    const [dateState, setDateState] = useState(date || moment('1990-01-01').toDate());
    console.log('dateState :>> ', dateState);

    const [titleValue, setTitleValue] = useState(date ? null : title);

    useEffect(() => {
        if (date) {
            setDateState(moment(date).toDate());
            setTitleValue(moment(date).format('L'));
        }
    }, [date]);

    const onCancel = () => {
        setShowPicker(false);
    };
    const onShowPicker = () => {
        if (!disable) {
            setShowPicker(true);
        }
    };
    const onConfirmDate = (date: any) => {
        setTitleValue(null);
        onCancel();
        setDateState(date);
        if (onPickedDate) {
            onPickedDate(date);
        }
    };

    return (
        <>
            <PickerButton
                containerStyle={[
                    !_.isEmpty(error) && {
                        borderColor: showPicker
                            ? AppEComm.color.blue_001
                            : AppEComm.color.red,
                    },
                    containerStyle,
                    ,
                ]}
                rightComponent={() => <IcArrowDown width={20} height={6} />}
                leftComponent={(valueIsNotEmpty, styles) => {
                    if (valueIsNotEmpty && (!titleValue || /\d/.test(titleValue))) {
                        return <ICDateActive {...styles} />;
                    } else {
                        return <ICDate {...styles} />;
                    }
                }}
                label={titleValue ? titleValue : FormatDatetime(moment(dateState).toDate(), mode)}
                isFocused={showPicker} //when the datetime picker show that means the button is focused
                valueIsNotEmpty={Boolean(dateState)}
                onPress={onShowPicker}
            />
            <DateTimePickerModal
                minimumDate={minimumDate}
                isVisible={showPicker}
                mode={mode}
                themeVariant="light"
                date={moment(dateState).toDate()}
                textColor={AppEComm.color.black}
                isDarkModeEnabled={false}
                confirmTextIOS={'Select'}
                cancelTextIOS={'Cancel'}
                onConfirm={onConfirmDate}
                onCancel={onCancel}
                modalStyleIOS={{
                    marginBottom: '50%',
                }}
            />
            {Boolean(error) && !_.isEmpty(error) && (
                <View>
                    <Text style={styles.errorMessage}>{error.message}</Text>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    errorMessage: {
        color: AppEComm.color.red,
        fontSize: fontPixel(12),
        lineHeight: heightPixel(18),
        marginBottom: 16,
        marginTop: -14,
    },
});
