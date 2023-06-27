import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BackHeader from '../../../components/Header/BackHeader'
import { ImageTransport } from '../../../assets/icons'
import { fontPixel, heightPixel, widthPixel } from '../../../ultils/scanling'
import { AppEComm } from '../../../constants/colors'
import UserInput from '../../../components/UserInput'
import Button from '../../../components/Button/Button'
import Spacer from '../../../components/Spacer'
import { checkValidateStringField } from '../../../ultils/CheckValidateInput'
import { useDispatch } from 'react-redux'
import { getAddress } from '../../../redux/actions/AddressAction'

const AddressShip = () => {

    const dispatch = useDispatch();

    const [formAddressState, setFormAddressState] = useState<any>({
        name: { value: "", error: null as null | { message: string } },
        address: { value: "", error: null as null | { message: string } },
        phone: { value: "", error: null as null | { message: string } },
    });

    const checkValidateFormAddress = () => {
        const errorName = checkValidateStringField(formAddressState.name.value);
        const errorAddress = checkValidateStringField(formAddressState.address.value);
        const errorPhone = checkValidateStringField(formAddressState.phone.value);

        setFormAddressState({
            ...formAddressState,
            name: {
                value: formAddressState.name.value,
                error: errorName,
            },
            address: {
                value: formAddressState.address.value,
                error: errorAddress,
            },
            phone: {
                value: formAddressState.phone.value,
                error: errorPhone,
            },
        });
        if (errorName || errorAddress || errorPhone) {
            return false;
        }
        return true;

    };

    const submitForm = () => {
        if (checkValidateFormAddress()) {
            const dataAddress = []; // Create an array to hold the objects

            // Iterate over the fields in formAddressState
            for (const key in formAddressState) {
                if (Object.prototype.hasOwnProperty.call(formAddressState, key)) {
                    const { value } = formAddressState[key];
                    const newDataObject = {
                        name: value,
                        address: formAddressState.address.value,
                        phone: formAddressState.phone.value,
                    };

                    dataAddress.push(newDataObject); // Add the new object to the array
                }
            }

            // Perform further actions with the dataAddress array, such as submitting it to a server

            dispatch(getAddress({
                dataAddress: dataAddress
            }))
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: AppEComm.color.white }}>
            <View style={styles.header}>
                <View style={styles.emptyContainer}>
                    <BackHeader title={'Add Address'} />
                </View>
            </View>
            <Spacer height={20} />

            <View style={{ paddingHorizontal: 16 }}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={ImageTransport} style={{ width: widthPixel(200), height: heightPixel(120) }} />
                </View>
                <View>
                    <Text style={styles.txtTitle}>Last Name:</Text>
                    <UserInput.TextInput
                        value={formAddressState.name}
                        placeholder={`Last Name`}
                        error={formAddressState.name.error}
                        onChangeText={(text) => {
                            setFormAddressState({
                                ...formAddressState,
                                name: {
                                    value: text,
                                    error: null,
                                },
                            });
                        }}
                        keyboardType="decimal-pad"
                        containerStyle={styles.inputs}
                    />
                </View>
                <View>
                    <Text style={styles.txtTitle}>Address for Delivery:</Text>
                    <UserInput.TextInput
                        value={formAddressState.address}
                        placeholder={`Address for Delivery`}
                        error={formAddressState.address.error}
                        onChangeText={(text) => {
                            setFormAddressState({
                                ...formAddressState,
                                address: {
                                    value: text,
                                    error: null,
                                },
                            });
                        }}
                        keyboardType="decimal-pad"
                        containerStyle={styles.inputs}
                    />
                </View>
                <View>
                    <Text style={styles.txtTitle}>Mobile Phone:</Text>
                    <UserInput.TextInput
                        value={formAddressState.phone}
                        placeholder={`Mobile Phone`}
                        error={formAddressState.phone.error}
                        onChangeText={(text) => {
                            setFormAddressState({
                                ...formAddressState,
                                phone: {
                                    value: text,
                                    error: null,
                                },
                            });
                        }}
                        keyboardType="decimal-pad"
                        containerStyle={styles.inputs}
                    />
                </View>
                <Button
                    text="Add Address"
                    buttonSize="Medium"
                    onPress={() => submitForm()}
                />
            </View>

        </View >
    )
}

export default AddressShip

const styles = StyleSheet.create({
    header: {
        height: heightPixel(122),
        borderBottomColor: AppEComm.color.borderColor,
        borderBottomWidth: widthPixel(1),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: Platform.OS == 'ios' ? heightPixel(50) : heightPixel(10),
        paddingHorizontal: widthPixel(16),
        backgroundColor: AppEComm.color.white,
    },
    emptyContainer: {
        marginRight: heightPixel(16),
    },
    inputs: {
        borderColor: AppEComm.color.borderColor,
        borderRadius: widthPixel(5),
        width: '100%',
        height: heightPixel(46),
    },
    txtTitle: {
        color: AppEComm.color.text,
        fontWeight: '700',
        lineHeight: 15,
        letterSpacing: 0.5,
        fontSize: fontPixel(13),
        paddingVertical: 12
    }
})