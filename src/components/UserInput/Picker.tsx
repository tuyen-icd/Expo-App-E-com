import React, { FC, useState, useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import { IcArrowDown } from '@assets/icons';
import _ from 'lodash';
import { ContainerProps, ContainerComponent } from './Container';
import { BaseProps } from './BaseProps';
import { styles } from './styles';
import BottomFlatPicker from '@components/BottomFlatPicker';
import BottomWheelPicker from '@components/BottomWheelPicker';
import { showError } from '@utils/Alert';

export interface PickerButtonProps extends ContainerProps {
    data?: any;
    label?: string;
    onShowPicker?: () => void;
    onPress?: () => void;
    disable?: boolean;
}

export interface PickerProps extends BaseProps {
    children?: React.ReactNode;
    title?: string;
    value?: any;
    data?: any;
    onPickedData?: (data: any) => void;
    isWheel?: boolean;
    disable?: boolean;
}

export const PickerButton: FC<PickerButtonProps> = (props: {
    containerStyle?: any;
    valueIsNotEmpty?: any;
    isFocused?: any;
    label?: any;
    onShowPicker?: any;
    onPress?: any;
    disable?: any;
}) => {
    const { label, onShowPicker, onPress, disable } = props;
    if (!disable) {
        return (
            <ContainerComponent {...props} onRightComponentPress={onPress}>
                <Pressable style={styles.pickerWrap} onPress={onPress}>
                    <Text numberOfLines={1} style={styles.pickerText} onPress={onShowPicker}>
                        {label}
                    </Text>
                </Pressable>
            </ContainerComponent>
        );
    } else {
        return (
            <ContainerComponent {...props}>
                <View style={styles.pickerWrap}>
                    <Text numberOfLines={1} style={styles.pickerText} onPress={onShowPicker}>
                        {label}
                    </Text>
                </View>
            </ContainerComponent>
        );
    }
};

export const Picker: FC<PickerProps> = (props: {
    title?: string;
    leftComponent?: any;
    data?: any;
    containerStyle?: any;
    value?: any;
    onPickedData?: any;
    isWheel?: any;
}) => {
    const { onPickedData, value, data, title, isWheel } = props;
    const [pickedData, setPickedData] = useState(value);
    const [modalVisible, setModalVisible] = useState(false);

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleConfirm = (value: any) => {
        setModalVisible(false);
        setPickedData(value);
        onPickedData(value);
    };

    useEffect(() => {
        setPickedData(value);
    }, [value]);

    return (
        <>
            <PickerButton
                {...props}
                valueIsNotEmpty={Boolean(value)}
                isFocused={modalVisible}
                onPress={() => {
                    if (data.length === 0) {
                        showError('Không có dữ liệu');
                        return;
                    }
                    setModalVisible(true);
                }}
                label={pickedData?.toString()}
                rightComponent={() => <IcArrowDown width={20} height={6} />}
            />
            {!isWheel && (
                <BottomFlatPicker
                    title={title}
                    data={data}
                    defaultValue={pickedData}
                    isVisible={modalVisible}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                />
            )}
            {isWheel && data.length !== 0 && (
                <BottomWheelPicker
                    data={data}
                    defaultValue={pickedData}
                    isVisible={modalVisible}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                />
            )}
        </>
    );
};
