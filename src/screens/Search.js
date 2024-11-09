import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Button, Overlay, Text, Divider, Input } from '@rneui/themed'
import TabButton from './TabButton'
import useBasicImport from './BaseScreen'

function SearchPopup(props) {
  return (
    <Overlay isVisible={props.visible} onBackdropPress={props.hideDialog} overlayStyle={{ width: '90%' }}>
      <View style={{ alignItems: 'stretch' }}>
        <Text style={{ fontSize: 18, margin: 8 }}>{`SEARCH BY ${props.title}`}</Text>
        <Divider color='#000' width={StyleSheet.hairlineWidth} style={{ marginBottom: 16 }} />
        <Input
          label='Input'
        />
        <Button title="Search" containerStyle={{ alignSelf: 'flex-end' }} onPress={props.hideDialog} />
      </View>
    </Overlay>
  );
}


function Search() {
  const contextImport = useBasicImport()
  const [visible, setVisible] = useState(false);
  const [option, setOption] = useState('');

  const toggleOverlay = () => {
    setVisible(!visible);
    contextImport.navigation.navigate('Voter List', { type: option.title });
  };

  const menu = [{ label: "Name", filter: 'efm_name' },
  { label: "Last Name", filter: 'elastname' },
  { label: "Age", filter: 'age' },
  { label: "Gender", filter: 'sex' },
  { label: "Address", filter: 'address' },
  { label: "Mobile", filter: 'mobile_no' },
  { label: "Pincode", filter: 'pincode' },
  { label: "IDCard", filter: 'idcard_no' }]

  return (
    <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
      {
        menu.map((item, index) => {
          //   return <Button title={`SEARCH BY ${item.label}`} raised containerStyle={style.buttonContainer} key={index} onPress={() => {
          //     contextImport.navigation.navigate('SearchList', { by: item.label, type: item.filter });
          //   }} />
          // })

          return (
            <TouchableOpacity style={style.buttonContainer} key={index} onPress={() => {
              contextImport.navigation.navigate('SearchList', { by: item.label, type: item.filter });
            }}>
              <TabButton label={`${item.label}`} icon={'cog-outline'} iconfamily={'material-community'} color={'grey'} />
            </TouchableOpacity>
          )
        })
      }
      <SearchPopup visible={visible} hideDialog={toggleOverlay} title={option.title} />
    </View>
  );
}

const style = StyleSheet.create({
  buttonContainer: {
    margin: 10,
    padding:10,
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 3,
    width: '30%'
  }
});

export default Search;