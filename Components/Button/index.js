import { Pressable, Text, StyleSheet } from 'react-native'
import React from 'react'

const Button = ({ text, onPress, containerStyles}) => {
  return (
    <Pressable onPress={onPress} style={[styles.root, containerStyles]}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#e47911',
    marginVertical: 10,
    height: 35,
    justifyContent : 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#a15e1b',


  },
  text: {
    fontSize: 16,

  },
})

export default Button;

