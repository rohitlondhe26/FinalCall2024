import React, { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import { Title, List,FAB } from 'react-native-paper';
import useBasicImport from './BaseScreen'
import Layout from './Layout';
import { getSuchanaByUser } from './api';

const Suchana = () => {
    const contextImport = useBasicImport()
    const [loading, setLoading] = useState()
    const [data, setData] = useState()

    useEffect(() => {
       
        const fetchGetSuchanaByUser = async () => {
            try {
                console.log("fetchGetSuchanaByUser")
                let res = await getSuchanaByUser();
                console.log(res?.data?.data);
                setData(res?.data?.data);
            } catch (error) {
                console.log("ERROR ", error);

                setData([])
            }
            setLoading(false)
        }

        fetchGetSuchanaByUser();
        setLoading(true);

    }, [])




    return <Layout loading={loading} title={"Suchana"}>
        <FlatList
            style={{ paddingVertical: 10, paddingHorizontal: 5 }}
            data={data}
            renderItem={({ item, index }) => (
                <View style={{ backgroundColor: 'white', borderRadius: 10, margin: 4, elevation: 2 }}>
                    <List.Item
                        title={item.suchana}
                        titleStyle={{ fontSize: 16, borderBottomColor: '#757575' }}
                        descriptionStyle={{ color: '#616161' }}
                        description={item.updateon}
                        descriptionNumberOfLines={50}
                    />
                </View>
            )
            }
            keyExtractor={(item, index) => index}
            ListEmptyComponent={<Title> No Information found</Title>}
        />
        <FAB
            icon="plus"
            backgroundColor={"#ed9440"}
            style={{
                position: 'absolute',
                margin: 16,
                right: 0,
                bottom: 0,
            }}
            onPress={() =>  contextImport.navigation.navigate("SuchanaAddInfo")}
        />

    </Layout>

   
}

export default Suchana;