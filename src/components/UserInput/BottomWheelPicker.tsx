import React, { FC, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from 'react-native-wheel-pick';
import { heightPixel, pixelSizeHorizontal, pixelSizeVertical } from '../../ultils/scanling';
import { defaultStyle } from '../../constants/defaultStyle';
import Button from '../Button/Button';




interface BottomWheelPickerProps {
    data?: string[];
    defaultValue?: string;
    isVisible?: boolean;
    onCancel?: () => void;
    onConfirm?: (value: any) => void;
}

const BottomWheelPicker: FC<BottomWheelPickerProps> = ({
    data,
    defaultValue,
    isVisible,
    onCancel,
    onConfirm,
}) => {

    const [selectedItem, setSelectedItem] = useState(defaultValue);
    return (
        <Modal
            backdropOpacity={0.3}
            isVisible={isVisible}
            onBackdropPress={onCancel}
            style={styles.bottomModelContain}>
            <View style={styles.contain}>
                <View style={styles.topContain}>
                    <Picker
                        style={styles.wheelPickerContain}
                        selectedValue={selectedItem}
                        pickerData={data}
                        onValueChange={(item: any) => {
                            setSelectedItem(item);
                        }}
                    />
                    <Button
                        text={'Verify'}
                        buttonSize="Medium"
                        onPress={() => onConfirm(selectedItem)}
                        buttonStyles={{
                            ...styles.buttonStyle,
                            borderTopColor: '#F6F6F6',
                            borderBottomLeftRadius: 15,
                            borderBottomRightRadius: 15,
                            borderTopWidth: 1,
                        }}
                        textStyle={[defaultStyle.sub1, styles.buttonTextStyle]}
                    />
                </View>

                <Button
                    text={'Cancle'}
                    buttonSize="Medium"
                    onPress={onCancel}
                    buttonStyles={{ ...styles.buttonStyle, marginTop: 7.5 }}
                    textStyle={defaultStyle.sub1}
                />
            </View>
        </Modal>
    );
};

export default BottomWheelPicker;

const styles = StyleSheet.create({
    bottomModelContain: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    buttonStyle: {
        backgroundColor: '#FFF',
    },
    buttonTextStyle: {
        fontWeight: '600',
    },
    wheelPickerContain: {
        flex: 1,
        marginVertical: Platform.OS === 'ios' ? 0 : pixelSizeVertical(15),
        backgroundColor: '#FFFFFF',
    },
    topContain: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        height: heightPixel(270),
        justifyContent: 'center',
        overflow: 'hidden',
    },
    contain: {
        marginHorizontal: pixelSizeHorizontal(10),
        marginBottom: pixelSizeVertical(30),
    },
});
