import React, { useEffect, useState } from 'react'
import { View, FlatList, TouchableHighlight, Alert } from 'react-native'
import { Avatar, List, Text, ActivityIndicator } from 'react-native-paper';
import useBasicImport from './BaseScreen'
import Layout from './Layout';
import { CATEGORY, getCategory } from './api'

const ListItem = React.memo(({ item, type, navigation }) => {

  const getSubText = (selectedItem, type) => {
    return `${selectedItem?.epic_no} [${selectedItem?.part_no}/${selectedItem?.slnoinpart}]`
  }

  const getTitle = () => {
      return <Text style={{ fontSize: 15, color: '#616161' }}><Text style={{ fontSize: 16 }}>{`${item?.fm_name_v1}`} </Text>{`${item?.lastname_v1} (${item?.age}) \n`}<Text style={{ fontSize: 16 }}>{`${item?.fm_name_en}`}</Text> {`${item?.lastname_en}`}</Text>
  }

  const getBorderWidth = () => {
    let { email, mobile_no, part_no_new, slnoinpart_new, votertype } = item;
    return (email || mobile_no || part_no_new || slnoinpart_new || votertype) ? 2 : 0;
  }


  return (
    <TouchableHighlight onPress={() => {
      navigation.navigate('VoterDetails', { item: JSON.stringify(item) })
    }} >
      <View style={{ backgroundColor: 'white', borderRadius: 10, margin: 4, elevation: 2 }}>
        <List.Item
          title={getTitle()}
          titleNumberOfLines={3}
          titleStyle={{ fontSize: 16, borderBottomColor: '#757575' }}
          description={getSubText(item, type)}
          descriptionNumberOfLines={8}
          descriptionStyle={{ color: '#616161' }}
          left={props => <Avatar.Image size={32} source={(item?.gender == 'F') ? require('../img/femal.jpg') : require('../img/male.jpg')} style={{ alignSelf: 'center', backgroundColor:"#2AAA8A", borderColor: '#2AAA8A', borderWidth: getBorderWidth() }} />}
          right={props => <List.Icon {...props} icon="chevron-right" style={{ alignSelf: 'center' }} />}
        />
      </View>
    </TouchableHighlight>
  );
});


function VoterList({ route }) {
  const contextImport = useBasicImport();
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([]);
  const [page, setPage] = useState();

  useEffect(() => {
    let search = route?.params?.type
    filter(search, 0);
  }, [])

  const filter = async (searchText, pagenumber) => {
    setLoading(true);
    let response = await getCategory(CATEGORY.VOTERTYPE, searchText, pagenumber);

    try {
      // setsearchText(searchText);
      setPage(pagenumber);
      if (response.data.data.length > 0) {
        setList(list => [...list, ...response.data.data]);
      } else {
        setHasMore(false); // No more data available
      }
    } catch (error) {
      setHasMore(false);
      Alert.alert("NOT FOUND", "Getting error while fetching Data", [{
        text: "OK",
        onPress: () => contextImport.navigation.goBack()
      }], { cancelable: false })
    }

    setLoading(false);
  }



  const loadMoreData = () => {
    if (!loading && hasMore) {
      let search = route?.params?.type
      filter(search, page + 1);
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  return (
    <Layout title={route?.params?.type}  >
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          style={{ marginBottom: 8 }}
          data={list}
          renderItem={({ item, index }) => <ListItem item={item} type={route?.params?.type} navigation={contextImport.navigation} />
          }
          ListFooterComponent={renderFooter}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          initialNumToRender={10} // Number of items to render initially
          maxToRenderPerBatch={10} // Number of items to render per batch
          updateCellsBatchingPeriod={50}
          removeClippedSubviews={true}
        />
      </View>
    </Layout>
  )
}

export default VoterList;