import React from 'react'
import { View, Image, Platform, PermissionsAndroid } from 'react-native'
import { Divider } from '@rneui/themed';
import { Appbar, Title, Avatar, Button, Menu, ActivityIndicator, MD2Colors } from 'react-native-paper';
// import MetaInput from '../assets/Metadata.json'
import useBasicImport from './BaseScreen'
// import RNFetchBlob from 'rn-fetch-blob';
const Layout = (props) => {
  const contextImport = useBasicImport()
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ elevation: 0 }}>
        <Appbar.Content title={props.title ? props.title : "NIRNAAYAK"} />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          style={{ margin: 4 }}
          anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} color={'#fff'} style={{ paddingHorizontal: 2, marginHorizontal: 2 }} />}>
          <Menu.Item
            style={{ backgroundColor: 'white' }}
            onPress={() => {
              closeMenu();
              contextImport.navigation.navigate('Landing');
            }}
            title="Dashboard"
            icon="account-circle-outline" />
        </Menu>
      </Appbar.Header>
      {
        props.loading ?
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
          :
          props.children
      }
    </View>
  )
}

export default Layout
