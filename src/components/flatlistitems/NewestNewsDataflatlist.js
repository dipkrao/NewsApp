/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Icons } from '../../constants';
import { format } from "date-fns";

const NewestNewsDataflatlist = (props) => {

    const navigation = useNavigation();
    const upcomingData = props.NewwstNewsData

    var bookingDateTime = new Date(upcomingData.item.publishedAt);
    var formattedDateTime = format(bookingDateTime, 'MMMM do, yyyy hh:mm a');

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.8} onPress={() => navigation.navigate('NewsDetailsScreen',
                    {
                        NewsDataDetails: upcomingData,
                    })}>
                <View style={styles.listsubcontainerstyle}>
                    <View style={styles.newstextboxcontainerstyle}>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: '700', fontStyle: 'italic' }} numberOfLines={1}>
                                {upcomingData.item.title}
                            </Text>
                            <Text style={{ fontSize: 16, fontWeight: '500', paddingTop: 5 }} numberOfLines={3}>
                                {upcomingData.item.description}
                            </Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 12, fontWeight: '700', fontStyle: 'italic', paddingTop: 10, textAlignVertical: 'bottom' }}>
                                {formattedDateTime}
                            </Text>
                        </View>

                    </View>
                    <View style={{ backgroundColor: 'transparent', width: '40%', justifyContent: 'center', borderRadius: 10 }}>
                        <Image source={{ uri: upcomingData.item.urlToImage }} style={{ height: 100, width: 100, justifyContent: 'center', resizeMode: 'cover', alignSelf: 'center', borderRadius: 10 }} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 12,
        paddingVertical: 10
    },

    listsubcontainerstyle: {
        borderRadius: 5,
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'white',
        elevation: 5,

    },

    newstextboxcontainerstyle: {
        backgroundColor: 'transparent',
        padding: 10,
        paddingBottom: 0,
        borderRadius: 5,
        width: '60%',
        justifyContent: 'space-between'
    }
});

export default NewestNewsDataflatlist;
