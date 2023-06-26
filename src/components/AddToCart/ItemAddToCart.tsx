import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { fontPixel, heightPixel, widthPixel } from '../../ultils/scanling'
import { AppEComm } from '../../constants/colors'
import { ICFavious, IcMinus, IcPlus, IcTrash } from '../../assets/icons'
import { defaultStyle } from '../../constants/defaultStyle'

const ItemAddToCart = () => {
    return (
        <View style={styles.borderItem}>
            <View style={defaultStyle.flexJustify}>
                <View style={styles.image}>

                </View>
                <View style={{ flexDirection: 'column' }}>
                    <View style={[defaultStyle.flexJustify, { marginBottom: heightPixel(12) }]}>
                        <Text style={styles.titleItem}>Nike Air Zoom Pegasus 36 Miami</Text>
                        <View style={[defaultStyle.flexJustify, { gap: 10 }]}>
                            <TouchableOpacity onPress={() => console.log('Favious')}>
                                <ICFavious />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => console.log('Trash')}>
                                <IcTrash />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={defaultStyle.flexJustify}>
                        <Text style={{
                            color: AppEComm.color.blue_001,
                            fontSize: fontPixel(12),
                            fontWeight: '700',
                            lineHeight: 15,
                            letterSpacing: 0.5
                        }}>$299.43</Text>
                        <View style={{
                            borderColor: AppEComm.color.borderColor,
                            borderWidth: widthPixel(1.5),
                            borderRadius: 5,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            // padding: 6
                        }}>
                            <TouchableOpacity style={{ paddingHorizontal: widthPixel(10) }} onPress={() => console.log("minus")}>
                                <IcMinus />
                            </TouchableOpacity>
                            <View style={styles.totalItemCart}>
                                <Text style={{
                                    color: AppEComm.color.text,
                                    fontSize: fontPixel(12),
                                    lineHeight: 15,
                                    letterSpacing: 0.5,
                                    textAlign: 'center'
                                }}>1</Text>
                            </View>
                            <TouchableOpacity style={{ paddingHorizontal: widthPixel(10) }} onPress={() => console.log("plus")}>
                                <IcPlus />
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
            </View>
        </View>

    )
}

export default ItemAddToCart

const styles = StyleSheet.create({
    borderItem: {
        marginTop: heightPixel(16),
        borderColor: AppEComm.color.borderColor,
        borderWidth: widthPixel(1.5),
        padding: widthPixel(16),
        borderRadius: 5
    },
    image: {
        width: widthPixel(72),
        height: heightPixel(72),
        backgroundColor: 'red',
        borderRadius: 5
    },
    titleItem: {
        color: AppEComm.color.text,
        fontSize: fontPixel(12),
        fontWeight: '700',
        lineHeight: 15,
        letterSpacing: 0.5,
        width: widthPixel(158)
    },
    totalItemCart: {
        width: widthPixel(40),
        height: heightPixel(24),
        backgroundColor: AppEComm.color.borderColor,
        alignItems: 'center',
        justifyContent: "center"
    }
})