/* eslint-disable prettier/prettier */
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    TouchableHighlight,
} from 'react-native';

const CommonButton = ({ children, ...rest }) => {
    return (
        <TouchableOpacity activeOpacity={0.75} style={styles.buttonstyle} {...rest}>
            <Text style={styles.buttontextstyle}> {children}</Text>
        </TouchableOpacity>
    );
};

export default CommonButton;

const styles = StyleSheet.create({
    buttonstyle: {
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#0C54BE',
        height: 40,
        width: 150,
        borderRadius: 5,
    },

    buttontextstyle: {
        fontSize: 20,
        color: 'white',
        justifyContent: 'center',
        alignSelf: 'center'
    }
});
