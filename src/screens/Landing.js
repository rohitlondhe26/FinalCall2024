import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Card, Divider, Title, useTheme, FAB, Headline, Button } from 'react-native-paper';
import Layout from './Layout';
import useBasicImport from './BaseScreen'
import { submitFCMToken, getDashboardData } from "./api";
// import InputData from '../assets/ElectionResultMeta.json'
// import Metadata from '../assets/Metadata.json'
import { Avatar, Text } from 'react-native-paper';

const Tab = createMaterialTopTabNavigator();

const Landing = () => {
    const { colors } = useTheme();
    const contextImport = useBasicImport()

    return (
        <Layout sync={true} title={"Dashboard"}>
            <SearchMenu />

            <Button mode="contained" onPress={
                () => contextImport.navigation.navigate('SearchListByMultiple')
            } style={{ margin: 6 }}>
                Search
            </Button>
            {/* <FAB
                style={[style.fab, { backgroundColor: colors.primary }]}
                label='Search'
                onPress={() => {
                    contextImport.navigation.navigate('SearchListByMultiple');
                }}
            /> */}
        </Layout>

    )
}

export const DashboardComponent = () => {
    const contextImport = useBasicImport();
    const [data, setData] = useState();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getDashboardData();
                console.log("--->", response?.data?.data)
                setData(response?.data?.data);
            } catch (error) {
                setData(null);
            }

        }
        getData();

    }, [])

    return (<>
        {
            !data ?
                <Image
                    resizeMethod='auto'
                    resizeMode='contain'
                    opacity={0.9}
                    style={{ width: '100%', height: '100%' }}
                    source={{ uri: 'http://onusapi.onus-tech.in/home.jpeg', method: 'GET', }}
                /> :
                <Card style={{ backgroundColor: 'white', elevation: 2, margin: 8 }} mode='elevated'>
                    <Card.Content>
                        <View style={{ flexDirection: 'column', rowGap: 5 }}>
                            <View style={{ backgroundColor: 'lightgrey', borderRadius: 10, padding: 4 }}>

                                <Text style={{ alignSelf: 'center' }}>Total Voter</Text>
                                <Title style={{ alignSelf: 'center' }}>2596</Title>
                            </View>

                            <View style={{ flexDirection: 'row', columnGap: 5 }}>
                                <View style={{ backgroundColor: 'lightgreen', flex: 1, alignItems: 'stretch', elevation: 1, borderRadius: 10, rowGap: 2, padding: 4, paddingVertical: 20 }}>
                                    <Title style={{ alignSelf: 'center', color: 'red' }} >Voted</Title>
                                    <Headline style={{ alignSelf: 'center', color: 'red' }}>1260</Headline>
                                </View>

                                <View style={{ backgroundColor: 'red', flex: 1, alignItems: 'stretch', elevation: 1, borderRadius: 10, rowGap: 2, padding: 4, paddingVertical: 20 }}>
                                    <Title style={{ alignSelf: 'center', color: 'lightgreen' }} >Pending</Title>
                                    <Headline style={{ alignSelf: 'center', color: 'lightgreen' }}>1100</Headline>
                                </View>
                            </View>

                            <Divider />
                            {/* <View style={{ flexDirection: 'row', columnGap: 5 }}>
                                <View style={{ backgroundColor: 'lightgrey', flex: 1, alignItems: 'stretch', elevation: 1, borderRadius: 10, rowGap: 2, padding: 4 }}>
                                    <Avatar.Image size={52} source={require('../img/femal.jpg')} style={{ alignSelf: 'center' }} />
                                    <Text style={{ alignSelf: 'center' }}>Female</Text>
                                    <Title style={{ alignSelf: 'center' }}>1260</Title>
                                </View>

                                <View style={{ backgroundColor: 'lightgrey', flex: 1, alignItems: 'stretch', elevation: 1, borderRadius: 10, rowGap: 2, padding: 4 }}>
                                    <Avatar.Image size={52} source={require('../img/male.jpg')} style={{ alignSelf: 'center' }} />
                                    <Text style={{ alignSelf: 'center' }}>Male</Text>
                                    <Title style={{ alignSelf: 'center' }}>1100</Title>
                                </View>
                            </View> */}
                            <Divider />
                            <View style={{ flexDirection: 'row', columnGap: 5 }}>
                                <TouchableOpacity
                                    style={{ backgroundColor: 'lightgrey', flex: 1, alignItems: 'stretch', elevation: 1, borderRadius: 10, rowGap: 2, padding: 4 }}
                                    onPress={() => contextImport.navigation.navigate('SearchListByVoterType', {
                                        type: 'आपला'
                                    })}>
                                    <View >
                                        <Title style={{ alignSelf: 'center' }}>1000</Title>
                                        <Text style={{ alignSelf: 'center' }}>आपला</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ backgroundColor: 'lightgrey', flex: 1, alignItems: 'stretch', elevation: 1, borderRadius: 10, rowGap: 2, padding: 4 }}
                                    onPress={() => contextImport.navigation.navigate('SearchListByVoterType', {
                                        type: 'विरोधक'
                                    })}
                                >
                                    <View >
                                        <Title style={{ alignSelf: 'center' }}>900</Title>
                                        <Text style={{ alignSelf: 'center' }}>विरोधक</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ backgroundColor: 'lightgrey', flex: 1, alignItems: 'stretch', elevation: 1, borderRadius: 10, rowGap: 2, padding: 4 }}
                                    onPress={() => contextImport.navigation.navigate('SearchListByVoterType', {
                                        type: 'तटस्थ'
                                    })}
                                >
                                    <View >
                                        <Title style={{ alignSelf: 'center' }}>300</Title>
                                        <Text style={{ alignSelf: 'center' }}>तटस्थ</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ backgroundColor: 'lightgrey', flex: 1, alignItems: 'stretch', elevation: 1, borderRadius: 10, rowGap: 2, padding: 4 }}
                                    onPress={() => contextImport.navigation.navigate('SearchListByVoterType', {
                                        type: 'सांगता येत नाही'
                                    })}
                                >
                                    <View >
                                        <Title style={{ alignSelf: 'center' }}>145</Title>
                                        <Text style={{ alignSelf: 'center', textAlign: 'center' }}>सांगता येत नाही</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Divider />
                            <View style={{ backgroundColor: 'lightgrey', borderRadius: 10, padding: 4 }}>

                                <Text style={{ alignSelf: 'center' }}>Target Voting</Text>
                                <Title style={{ alignSelf: 'center' }}>890</Title>
                            </View>
                        </View>
                    </Card.Content>
                </Card>
        }
    </>
    )

};



const SearchMenu = () => {
    const contextImport = useBasicImport()

    const menu = [{ label: "First Name", filter: 'FM_NAME_EN', icon: 'alpha-f-box-outline', navigateto: 'SearchListByFirstName' },
    { label: "Last Name", filter: 'LASTNAME_EN', icon: 'alpha-l-box-outline', navigateto: 'SearchListByFirstName' },
    { label: "Full Name", filter: 'FULL_NAME_EN', icon: 'alpha-n-box-outline', navigateto: 'SearchListByFirstName' },
    { label: "Age", filter: 'AGE', icon: 'alpha-a-box-outline', navigateto: 'SearchListAge' },
    { label: "Gender", filter: 'GENDER', icon: 'gender-male-female-variant', navigateto: 'SearchListGender' },
    { label: "Address", filter: 'AREALIST', icon: 'map-outline', navigateto: 'SearchListByFirstName' },
    { label: "Mobile No.", filter: 'MOBILE_NO', icon: 'cellphone', navigateto: 'SearchListByNumber' },
    { label: "Multiple", filter: 'AREALIST', icon: 'map-outline', navigateto: 'SearchListByMultiple' },
    // { label: "Pincode", filter: 'PINCODE', icon: 'map-marker-radius-outline', navigateto: 'SearchListByPincode' },
    { label: "Language", filter: 'PINCODE', icon: 'account-group-outline', navigateto: 'SearchListByLanguage' },
        //code commented by swapnal

    ]



    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <DashboardComponent />
            </View>
            <Card style={{ alignContent: 'flex-end', backgroundColor: 'white', margin: 6 }}>
                {/* <View>
                    <FlatList
                        data={menu}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={[style.buttonContainer, index % 3 == 0 ? {} : { borderLeftColor: '#D3D3D3', borderLeftWidth: 1 }]} key={index} onPress={() => {
                                contextImport.navigation.navigate(item.navigateto ? item.navigateto : 'SearchList', { by: item.label, type: item.filter });
                            }}>
                                <TabButton label={`${item.label}`} icon={item.icon ? item.icon : 'cog-outline'} iconfamily={'material-community'} color={'black'} labelStyle={{ color: 'black', opacity: 1, fontSize: 13, fontWeight: '900' }} size={32} />
                            </TouchableOpacity>
                        )
                        }
                        //Setting the number of column
                        numColumns={3}
                        keyExtractor={(item, index) => index}
                    />
                </View> */}
            </Card>
        </View>
    )
}




const style = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        borderTopColor: '#D3D3D3',
        borderTopWidth: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
    },
    chart: {
        flex: 1,
        marginVertical: 5
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: 'red',
    },
});

export default Landing
