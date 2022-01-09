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
    Modal,
    ActivityIndicator
} from 'react-native';
import Icons from '../../constants/Icons';
import { COLORS, SIZES } from '../../constants';
import RadioButtonRN from 'radio-buttons-react-native';
import CommonButton from '../../components/CommonButton';
import { ListItem, SearchBar } from "react-native-elements";
import CountryLists from '../../assets/dummyData/country/CountryList';
import NewestNewsDataflatlist from '../../components/flatlistitems/NewestNewsDataflatlist';
import DropDownPicker from 'react-native-dropdown-picker';
import { Badge } from 'react-native-elements/dist/badge/Badge';
import { format } from "date-fns";

export default function HomeScreen() {
    const navigation = useNavigation();

    const countrylist = CountryLists;

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedcountry, setselectedcountry] = useState(null);
    const [input, setInput] = useState("");

    const [newsData, setNewsData] = useState([]);
    const [searchTimer, setSearchTimer] = useState(null);

    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Newest', value: 'newest' },
        { label: 'Oldest', value: 'oldest' },
        { label: 'Popular', value: 'popularity' },
    ]);

    // ON SEARCH LIST UPDATE
    async function fetchData(text) {
        const res = await fetch(
            `https://newsapi.org/v2/everything?q=${text}&sortBy=popularity&apiKey=cc6d122fdfe842abb0422421bf3a0d3a`,
        );
        res
            .json()
            .then((res) => {
                setNewsData(res);
            })
            .catch((err) => console.log(err));
    }

    var bookingDateTime = new Date();
    var formattedDateTime = format(bookingDateTime, 'yyyy-MM-dd');

    async function fetchNewestData(value) {
        setLoading(true)
        if (value == 'newest') {
            var currentDate = new Date()
            const res = await fetch(
                `https://newsapi.org/v2/everything?q=Apple&from=${formattedDateTime}&sortBy=popularity&apiKey=cc6d122fdfe842abb0422421bf3a0d3a`,
            );
            res
                .json()
                .then((res) => {
                    setLoading(false)
                    setNewsData(res);
                })
                .catch((err) => console.log(err));
        }
        else if (value == 'oldest') {
            setLoading(true);
            var olddate = formattedDateTime - '2022-01-08'
            console.log('value')
            console.log(value)
            console.log('value')
            const res = await fetch(
                `https://newsapi.org/v2/everything?q=Apple&from=${olddate}&sortBy=popularity&apiKey=cc6d122fdfe842abb0422421bf3a0d3a`,
            );
            res
                .json()
                .then((res) => {
                    setLoading(false);
                    setNewsData(res);
                })
                .catch((err) => console.log(err));
        }
        else {
            getNewsData();
        }

    }

    //   GET NEWS DATA
    const getNewsData = async () => {
        try {
            const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=cc6d122fdfe842abb0422421bf3a0d3a');
            setLoading(false);
            setNewsData(await response.json());
        } catch (error) {
            setLoading(false);
            console.log("my error is " + error);
        }
    };

    useEffect(() => {
        getNewsData();
    }, []);

    if (loading) {
        return <ActivityIndicator style={{ justifyContent: 'center', alignSelf: 'center', flex: 1}} size="large" color={'#0C54BE'} />
    }

    return (
        <View style={styles.container}>

            {/* TOP HEADER */}
            <View style={styles.topHeader}>
                <Text style={styles.headerText}>
                    My News
                </Text>

                <View></View>

                <TouchableOpacity style={styles.addresscontainerstyle} onPress={() => setModalVisible(!modalVisible)}>
                    <View>
                        <Text style={styles.locationtextstyle}>
                            Location
                        </Text>
                        <View style={styles.addressstyle}>
                            <Image source={Icons.locationicon} style={styles.piniconstyle} />
                            <Text style={styles.locationtextstyle}>
                                {selectedcountry && selectedcountry.label}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={{ backgroundColor: 'transparent', flex: 1 }}>
                <SearchBar
                    placeholder="Search for news, topics..."
                    lightTheme
                    onChangeText={(text) => {
                        if (searchTimer) {
                            clearTimeout(searchTimer);
                        }
                        setInput(text);
                        setSearchTimer(setTimeout(() => {
                            fetchData(text);
                        }, 2000),
                        );
                    }}
                    value={input}
                    autoCorrect={false}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={styles.titlestyle}>
                            Top Headlines
                        </Text>
                    </View>
                    <View style={{ padding: 15, marginRight: 50 }}>
                        <DropDownPicker
                            placeholder={"Sort:"}
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            labelProps={{
                                numberOfLines: 1,
                            }}
                            onChangeValue={(value) => {
                                if (searchTimer) {
                                    clearTimeout(searchTimer);
                                }
                                setValue(value);
                                setSearchTimer(setTimeout(() => {
                                    fetchNewestData(value);
                                }, 2000),
                                );
                            }}
                            zIndex={10000}
                            zIndexInverse={1000}
                            style={styles.pickerContainer}
                            textStyle={{ fontSize: 12 }}
                            listMode="FLATLIST"
                            dropDownContainerStyle={styles.dropDownContainerStyle}
                            closeAfterSelecting={true}
                        />
                    </View>
                </View>

                {/* Flat List Data */}
                <View style={styles.listcontainerstyle}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item}
                        data={newsData.articles}
                        renderItem={(item, index) => (
                            <NewestNewsDataflatlist
                                NewwstNewsData={item}
                            />
                        )}
                    />
                </View>
            </View>

            {/* Country Picker */}
            {modalVisible && (
                <Modal
                    animationType="fade"
                    transparent={true}
                    showModal={modalVisible}
                    backgroundColor="black"
                    onRequestClose={() => setModalVisible(false)}
                    statusBarTranslucent>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalView}>
                            <Text style={styles.choosetextstyle}>
                                Choose Your Location
                            </Text>
                            <View style={{ paddingVertical: 20 }}>
                                <RadioButtonRN
                                    data={countrylist}
                                    initial={3}
                                    activeColor={'#004876'}
                                    animationTypes={['shake']}
                                    selectedBtn={value => {
                                        setselectedcountry(value);
                                    }}
                                    circleSize={10}
                                />
                            </View>

                            <View styles={styles.buttoncontainerstyle}>
                                <CommonButton onPress={() => setModalVisible(false)} children="Apply" />
                            </View>
                        </View>
                    </View>
                </Modal>
            )}

            {/* More Filter Icon */}
            <View style={styles.floatingiconcontainerstyle}>
                <Image source={Icons.filter} style={{ height: 25, width: 25 }}>
                </Image>
                <Badge value={<Image source={Icons.reddot} style={{ height: 8, width: 8, resizeMode: 'contain' }} />} badgeStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }} containerStyle={{ position: 'absolute', top: 6, right: 8 }} />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAEAEA',
    },

    topHeader: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        backgroundColor: '#0C54BE',
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Platform.select({
            ios: 40,
            android: 0
        })
    },

    headerText: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
    },

    addresscontainerstyle: {
        alignSelf: 'center',
    },

    addressstyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center'
    },

    locationtextstyle: {
        color: 'white',
        fontSize: 16,
    },

    piniconstyle: {
        height: 15,
        width: 15,
        paddingRight: 5
    },

    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: COLORS.modalBackground,
    },

    modalView: {
        backgroundColor: 'white',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding: 20
    },

    choosetextstyle: {
        color: 'grey',
        fontSize: 18
    },

    buttoncontainerstyle: {
        paddingVertical: 15
    },

    titlestyle: {
        padding: 15,
        color: 'grey',
        fontSize: 24,
        fontWeight: '800'
    },

    listcontainerstyle: {
        flex: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'transparent',
    },

    listsubcontainerstyle: {
        borderRadius: 5,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        elevation: 5
    },

    newstextboxcontainerstyle: {
        backgroundColor: 'transparent',
        padding: 10,
        paddingBottom: 0,
        borderRadius: 5,
        width: '60%'
    },

    pickerContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        height: 25,
        width: '42%',
        alignSelf: 'flex-end',
    },

    dropDownContainerStyle: {
        backgroundColor: 'white',
        borderWidth: 0.5,
        width: '42%',
        alignSelf: 'flex-end',
    },

    floatingiconcontainerstyle: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#0C54BE',
        borderRadius: 30,
        elevation: 8
    }

})