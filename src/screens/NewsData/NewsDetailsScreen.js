import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import {
    Text,
    Image,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    FlatList,
    StatusBar,
    Linking,
} from 'react-native';
import Icons from '../../constants/Icons';
import { format } from "date-fns";

export default function NewsDetailsScreen(props) {
    const navigation = useNavigation();
    const NewsDetails = props.route.params.NewsDataDetails

    var bookingDateTime = new Date(NewsDetails.item.publishedAt);
    var formattedDateTime = format(bookingDateTime, 'MMMM do, yyyy | hh:mma');

    return (
        <View style={styles.container}>
            <View style={styles.topHeader}>
                <TouchableOpacity style={styles.backiconcontainerstyle} onPress={() => navigation.goBack()}>
                    <Image source={Icons.backarrow} style={styles.backiconstyle} />
                </TouchableOpacity>
                <View></View>
            </View>
            <View>
                <ImageBackground source={{ uri: NewsDetails.item.urlToImage }} style={styles.imagestyle} >
                    <View style={{ flex: 1, justifyContent: 'space-between' }}>
                        <View>
                        </View>
                        <View style={{ paddingBottom: 10 }}>
                            <Text style={styles.titleoverimagestyle} numberOfLines={2}>
                                {NewsDetails.item.title}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <View style={{ padding: 20 }}>
                <Text style={styles.titlestyle}>
                    {NewsDetails.item.title}
                </Text>
                <Text>
                    {formattedDateTime}
                </Text>
            </View>

            <View>
                <Text style={styles.descriptionstyle}>
                    {NewsDetails.item.description}
                </Text>
            </View>
            <View>
                <TouchableOpacity onPress={() => Linking.openURL(NewsDetails.item.url)}>
                    <Text style={styles.seefullliststyle}>
                        See full story
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    topHeader: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        backgroundColor: '#0C54BE',
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Platform.select({
            ios: 40,
            android: 0
        })
    },

    backiconcontainerstyle: {
        width: 25,
        height: 30,
        justifyContent: 'center',
    },

    backiconstyle: {
        height: 20,
        width: 20
    },

    imagestyle: {
        height: 280,
        width: '100%',
        resizeMode: 'contain',
    },

    titleoverimagestyle: {
        padding: 5,
        color: 'white',
        fontSize: 16,
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },

    titlestyle: {
        fontSize: 20,
        fontStyle: 'italic',
        color: '#7E889E',
        paddingBottom: 10
    },

    descriptionstyle: {
        fontSize: 18,
        color: '#848EA3',
        paddingHorizontal: 15,
        textAlign: 'justify'
    },

    seefullliststyle: {
        fontSize: 18,
        color: '#6E99D8',
        fontWeight: '700',
        padding: 15
    }
});