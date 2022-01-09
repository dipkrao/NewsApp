import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import {
    Text,
    Image,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
    StatusBar,
} from 'react-native';
import { Images } from '../../constants';

export default function WelcomeScreen() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.subcontainer}>
                <View>
                    <Image source={Images.newsimage} style={styles.imagestyle}>
                    </Image>
                </View>
                <View>
                    <TouchableOpacity style={styles.buttonstyle} onPress={() => navigation.navigate('HomeScreen')}>
                        <Text style={styles.buttontextstyle}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    subcontainer: {
        justifyContent: 'center',
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 50
    },

    buttonstyle: {
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#0C54BE',
        height: 50,
        width: 200,
        borderRadius: 10
    },

    buttontextstyle: {
        fontSize: 20,
        color: 'white',
        justifyContent: 'center',
        alignSelf: 'center'
    },

    imagestyle: {
        height: 350,
        width: 350,
        justifyContent: 'center',
        alignSelf: 'center'
    },
});