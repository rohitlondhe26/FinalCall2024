import React, { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import { Text, ListItem, Overlay, Divider } from '@rneui/themed'
import useBasicImport from './BaseScreen'
// import DatabaseHelper from './DatabaseHelper';

function VoterList() {
  const contextImport = useBasicImport();
  const [param, setParam] = useState('');
  const [selectedItem, setselectedItem] = useState(null);
  const [list, setList] = useState([]);
  const [showOverlay, setshowOverLay] = useState(false)
  useEffect(() => {
    let type = contextImport.route?.params?.type;
    // let array = DatabaseHelper.retriveAllInTable(DatabaseHelper.getRealmObject());
    // setList(array);
  }, [contextImport.route])



  const renderItem = ({ item }) => (
    <ListItem bottomDivider onPress={() => { setselectedItem(item); setshowOverLay(true); }}>
      <ListItem.Content>
        <ListItem.Title>{`${item.nfm_name} ${item.nlastname}`}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );


  return (<>
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={list}
      renderItem={renderItem}
      style={{ padding: 8 }}
    />

    <Overlay isVisible={showOverlay} onBackdropPress={() => setshowOverLay(false)}>
      <View style={{ flex: 0.5, alignItems: 'stretch', width: 300 }}>
        <Text h4 >Voter Info</Text>
        <Divider />
        <View style ={{marginVertical:20}}>
          <Text style={{fontSize:18}}> {`Name :- ${selectedItem?.nfm_name} ${selectedItem?.nlastname}`}</Text>
          <Text style={{fontSize:18}}> {`Address :- ${selectedItem?.nhouse_no}, ${selectedItem?.locn_bldg_unic},${selectedItem?.ps_name_unic}`}</Text>
          <Text style={{fontSize:18}}> {`Sex :- ${selectedItem?.sex}`}</Text>
          <Text style={{fontSize:18}}> {`Age :- ${selectedItem?.age}`}</Text>
          <Text style={{fontSize:18}}> {`Mobile :- ${selectedItem?.mobile_no}`}</Text>
          <Text></Text>
        </View>
      </View>
    </Overlay>
  </>
  );
}

export default VoterList;