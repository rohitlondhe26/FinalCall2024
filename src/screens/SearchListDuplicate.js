import React, { useEffect, useState } from 'react'
import { View, FlatList, TouchableHighlight } from 'react-native'
import {  Avatar, List, DefaultTheme, Subheading, ActivityIndicator, Text } from 'react-native-paper';
import useBasicImport from './BaseScreen'
// import DatabaseHelper from './DatabaseHelper';
import Layout from './Layout';
import { ButtonGroup } from '@rneui/themed'
// import InputData from '../assets/Vandhiya.json'
// import MetaInput from '../assets/Metadata.json'
// import alasql from 'alasql'
function SearchListDuplicate() {
  const contextImport = useBasicImport();
  // const [count, setcount] = useState(0)
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    // filter(null);
    // setTimeout(async () => await filter(null), 0);
  }, [])

  // const filter = async (text) => {
  //   console.log('Filter');

  //   let _array = null
  //   if (text == null) {
  //     _array = alasql('SELECT COUNT(*) AS total, * FROM ? GROUP BY GENDER, FM_NAME_EN, LASTNAME_EN, AGE', [InputData]);
  //   } else {
  //     _array = alasql('SELECT COUNT(*) AS total, * FROM ? GROUP BY GENDER, FM_NAME_EN, LASTNAME_EN, AGE, EPIC_NO', [InputData]);
  //   }
  //   console.log('Filter 1');
  //   _array = alasql('SELECT * FROM ? where total > 1 ORDER BY FM_NAME_EN, LASTNAME_EN ASC', [_array]);
  //   console.log('Filter 2');
  //   // let data = InputData;
  //   // _array = alasql('select * FROM ? data INNER JOIN ? _array where data.FM_NAME_EN LIKE _array.FM_NAME_EN AND data.LASTNAME_EN LIKE _array.LASTNAME_EN ORDER BY data.FM_NAME_EN, data.LASTNAME_EN', [data, _array]);
  //   //  _array = alasql('select * from ? where SLNOINPART IN (SELECT SLNOINPART from ? ) ORDER BY FM_NAME_EN, LASTNAME_EN ASC', [InputData, _array]);
  //   // console.log('Filter 3');
  //   console.log(_array.length);
  //   setList(_array);
  //   setLoading(false);
  // }

  return (<Layout title={`${contextImport.route?.params?.by}`}>
    {/* <View style={{ flex: 1, marginVertical: 8 }}>
      {loading ? <ActivityIndicator style={{ flex: 1 }} animating={true} color={'#C62828'} /> : <VoterList data={list} />}
    </View>
    <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', flexDirection: 'row', borderTopColor: DefaultTheme.colors.text, borderWidth: 0.5 }}>
      <TabGroup onItemClick={(item) => {
        setLoading(true);
        setTimeout(async () => await filter(item), 0);
      }
      } />
    </View> */}
    <Text variant="displaySmall" style={{flex:1, alignContent:'center'}}>Coming soon....</Text>
  </Layout>);
}

const TabGroup = ({ onItemClick }) => {
  const [selectedIndex, setselectedIndex] = React.useState(-1)
  let data = {};// MetaInput.Gender;
  return (
    <View style={{ flex: 1 }}>
      <ButtonGroup
        onPress={(index) => {
          setselectedIndex(selectedIndex == index ? -1 : index);
          onItemClick(selectedIndex == index ? null : index);
        }
        }
        selectedIndex={selectedIndex}
        buttons={[`Including Voter ID`]}
        selectedButtonStyle={{ backgroundColor: '#009688' }}
        selectedTextStyle={{ color: '#fff' , fontWeight: 'bold' }}
      />
    </View>
  )
}

function VoterList(props) {
  const contextImport = useBasicImport();
  return (

    <FlatList
      keyExtractor={(item, index) => index.toString()}
      style={{ marginBottom: 16, flex: 1 }}
      data={props.data}
      renderItem={({ item, index }) => (
        <TouchableHighlight onPress={() => contextImport.navigation.navigate('VoterDetails', { item: JSON.stringify(item) })} >
          <View style={{ backgroundColor: 'white', borderRadius: 10, margin: 4, elevation: 2 }}>
            <List.Item
              title={<Text style={{ fontSize: 16, color:  '#616161' }}>{`${item?.FM_NAME_V1} ${item?.LASTNAME_V1} `}<Text style={{ fontSize: 18 }}>{`(${item?.total})`}</Text> {`\n${item?.FM_NAME_EN} ${item?.LASTNAME_EN}`}</Text>}
              titleNumberOfLines={3}
              titleStyle={{ fontSize: 16, color:  '#616161' }}
              description={`${item?.EPIC_NO} (${item?.AGE})`}
              descriptionNumberOfLines={8}
              descriptionStyle={{ color:  '#616161' }}
              left={props => <Avatar.Image size={32} source={(item?.GENDER == 'F') ? require('../img/femal.jpg') : require('../img/male.jpg')} style={{ alignSelf: 'center' }} />}
              right={props => <List.Icon {...props} icon="chevron-right" style={{ alignSelf: 'center' }} />}
            />
          </View>
        </TouchableHighlight>
      )}
      ListHeaderComponent={() => (props.data.length <= 0 ?
        <Subheading style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}>Sorry, No data Found</Subheading>
        : null)}
    />
  )
}

export default SearchListDuplicate;