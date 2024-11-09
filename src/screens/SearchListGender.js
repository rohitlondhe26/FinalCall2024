import React, { useEffect, useState } from 'react'
import { View, FlatList, TouchableHighlight } from 'react-native'
import { Avatar, List, DefaultTheme, MD3Colors, MD2Colors } from 'react-native-paper';
import useBasicImport from './BaseScreen'
// import DatabaseHelper from './DatabaseHelper';
import Layout from './Layout';
import { ButtonGroup } from '@rneui/themed'
import { getCategory, CATEGORY } from './api'

const TabGroup = ({ onItemClick, dataSet, selectedIndex }) => {


  return (
    <View style={{ flex: 1 }}>
      <ButtonGroup
        onPress={(index) => {
          // console.log('Pressed' + index);
          switch (index) {
            default:
            case 0:
              onItemClick('M', 0);
              break;
            case 1:
              onItemClick('F', 1);
              break;
            case 2:
              onItemClick(null, 2);
              break;
          }

        }
        }
        selectedIndex={selectedIndex}
        buttons={[`MALE `, `FEMALE `, `ALL `]}
        selectedButtonStyle={{ backgroundColor: MD2Colors.amber800 }}
        selectedTextStyle={{ color: MD2Colors.black, fontWeight: 'bold' }}
      />
    </View>
  )
}

const ListItem = React.memo(({ item, type, navigation }) => {

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
          title={`${item?.fm_name_v1} ${item?.lastname_v1} (${item?.age}) \n${item?.fm_name_en} ${item?.lastname_en}`}
          titleNumberOfLines={3}
          titleStyle={{ fontSize: 16, color: '#616161' }}
          description={`${item?.epic_no} [${item?.part_no}/${item?.slnoinpart}]`}
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
  const [searchText, setsearchText] = useState("");
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([]);
  const [page, setPage] = useState();
  const [selectedIndex, setselectedIndex] = React.useState(0)
  useEffect(() => {
    filter("M", 0);
  }, [])

  const filter = async (searchText, pagenumber) => {
    setLoading(true);
    let response = await getCategory(CATEGORY.GENDERWISELIST, searchText, pagenumber);

    try {
      setsearchText(searchText);
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
      filter(searchText, page + 1);
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };
  return (
    <Layout title={`${contextImport.route?.params?.by}`} loading={loading} >
      <View style={{ flex: 1, marginVertical: 8 }}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          style={{ marginBottom: 4, flex: 1 }}
          data={list}
          renderItem={({ item, index }) => <ListItem item={item}  navigation={contextImport.navigation}/>
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
      <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', flexDirection: 'row', borderTopColor: DefaultTheme.colors.text, borderWidth: 0.5 }}>
        <TabGroup onItemClick={(item, index) => {
          setList([])
          setselectedIndex(index);
          filter(item, 0);
        }
        }
          selectedIndex={selectedIndex}
          dataSet={[]} />
      </View>
    </Layout>

  )
}

export default VoterList;