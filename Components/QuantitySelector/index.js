import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

const QuantitySelector = ({quantities, setQuantity}) => {
    const onMinus = () => {
        setQuantity(Math.max(0,quantities - 1));
    }

    const onPlus = () => {
        setQuantity(quantities + 1);
    }
    return (
        <View style={styles.root}>
            <Pressable style={styles.button} onPress={onMinus}>
                <Text style={styles.buttonText}>-</Text>
            </Pressable>

            <Text style={styles.quantity}>{quantities}</Text>

            <Pressable style={styles.button} onPress={onPlus}>
                <Text style={styles.buttonText}>+</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        width: 100,
        // position: 'reletive',
        // left: 10,
    },
    button: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#d1d1d1",

    },
    buttonText: {
        fontSize: 20,
    },
    quantity: {
        color: '#007eb9',
    }
})

export default QuantitySelector;
