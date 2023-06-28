import React, { FC } from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Button from '../Button/Button';
import { AppEComm } from '../../constants/colors';
import { fontPixel, heightPixel, pixelSizeHorizontal, pixelSizeVertical, widthPixel } from '../../ultils/scanling';
import { defaultStyle } from '../../constants/defaultStyle';



interface BottomFlatPickerProps {
    title?: string;
    data?: string[];
    defaultValue?: string;
    isVisible?: boolean;
    onCancel?: () => void;
    onConfirm?: (value: any) => void;
}

const BottomFlatPicker: FC<BottomFlatPickerProps> = ({
    title,
    data,
    isVisible,
    onCancel,
    onConfirm,
}) => {
    return (
        <Modal backdropOpacity={0.3} isVisible={isVisible} style={styles.bottomModelContain}>
            <View style={styles.contain}>
                <View style={styles.topContain}>
                    <View style={styles.pickItem}>
                        <Text style={[styles.title]}>{title}</Text>
                    </View>
                    {data?.map((value, i) => (
                        <TouchableOpacity
                            key={i}
                            onPress={() => {
                                onConfirm(data[i]);
                            }}>
                            <View style={styles.pickItem}>
                                <Text style={{}}>{value}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <Button
                    text={'Close'}
                    buttonSize="Medium"
                    onPress={onCancel}
                    buttonStyles={{ ...styles.buttonStyle }}
                    textStyle={{ ...defaultStyle.sub1 }}
                />
            </View>
        </Modal>
    );
};

export default BottomFlatPicker;

const styles = StyleSheet.create({
    bottomModelContain: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    buttonStyle: {
        backgroundColor: AppEComm.color.blue_001,
        height: heightPixel(50),
        marginTop: heightPixel(7.5),
        borderRadius: 10,
    },
    itemStyle: {
        color: AppEComm.color.black,
        fontSize: fontPixel(22),
    },
    topContain: {
        backgroundColor: AppEComm.color.blue_001,
        borderRadius: 10,
    },
    contain: {
        marginHorizontal: pixelSizeHorizontal(16),
        marginBottom: pixelSizeVertical(30),
    },
    pickItem: {
        height: 50,
        width: '100%',
        borderColor: AppEComm.color.borderColor,
        borderBottomWidth: widthPixel(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginTop: heightPixel(5),
        color: AppEComm.color.text,
    },
});
