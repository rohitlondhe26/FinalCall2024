import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, Tooltip, Icon } from '@rneui/themed'
import TabButton from './TabButton'
import useBasicImport from './BaseScreen'

// const themePrimaryColor = '#517fa4'
const themePrimaryColor = 'grey'
function Home() {
  const contextImport = useBasicImport()

  React.useEffect(() => {
    contextImport.navigation.setOptions({
      headerRight: () => (
        <Icon
          name='translate'
          type='material-community'
        />
      ),
    })
  }, []);

  return (
    <View style={{ flex: 10 }}>
      <View style={{ flex: 3.5, alignItems: 'center', justifyContent: 'center' }}>
        <Icon
          name='account-outline'
          type='material-community'
          color={themePrimaryColor}
          size={80}
        />

        <Text style={{ color: themePrimaryColor, fontStyle: "normal", fontSize: 36 }}> User name</Text>
      </View>
      <View style={{ flex: 5.5, alignItems: 'center', justifyContent: 'center', margin: 10 }}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.rowItem} onPress={() => contextImport.navigation.navigate('Search')}>

            <TabButton icon={'magnify'} iconfamily={'material-community'} label='Search' labelStyle={{ color: 'grey' }} color={'grey'} />

          </TouchableOpacity>
          <TouchableOpacity style={styles.rowItem}>
            <TabButton icon={'poll'} iconfamily={'material-community'} label='Polling Booth' labelStyle={{ color: 'grey' }} color={'grey'} />

          </TouchableOpacity>
        </View>
        <View style={styles.row}>

          <TouchableOpacity style={styles.rowItem}>
            <TabButton icon={'history'} iconfamily={'material-community'} color={'grey'} label={'History'} labelStyle={{ color: 'grey' }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowItem}>

            <TabButton icon={'cog-outline'} iconfamily={'material-community'} color={'grey'} label='Setting' labelStyle={{ color: 'grey' }} />

          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  );
}






const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',

  },
  rowItem: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 3,
    margin: 5
  }
});

export default Home;