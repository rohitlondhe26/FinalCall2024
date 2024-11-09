import React, { useState } from 'react'
import { View, FlatList, TouchableHighlight, TextInput, Alert } from 'react-native'
import { Avatar, List, Text, ActivityIndicator, Button, MD2Colors } from 'react-native-paper';
import useBasicImport from './BaseScreen'
import Layout from './Layout';
import { getCategory, CATEGORY } from './api';


const ListItem = React.memo(({ item, type, navigation, index }) => {

  const getSubText = (voter) => {
    return `\n${voter?.c_house_no_v1}, ${voter?.section_name_v1}\n\n${voter?.c_house_no}, ${voter?.section_name_en}`;
  }

  const getTitle = () => {
    return <Text style={{ fontSize: 15, color: '#616161' }}><Text style={{ fontSize: 16 }}>{`${item?.fm_name_v1} ${item?.lastname_v1} `} </Text> <Text style={{ fontSize: 16, color: 'black' }}>{`[${item?.part_no} | ${item?.slnoinpart} | ${item?.epic_no}] \n`}</Text><Text style={{ fontSize: 16 }}>{`${item?.fm_name_en}`}</Text> {`${item?.lastname_en}`}</Text>
  }

  const getBorderWidth = () => {
    let { email, mobile_no, part_no_new, slnoinpart_new, votertype } = item;
    return (email || mobile_no || part_no_new || slnoinpart_new || votertype) ? 2 : 0;
  }


  return (
    <TouchableHighlight onPress={() => {
      navigation.navigate('VoterDetails', { item: JSON.stringify(item) })
    }} >
      <View style={{ backgroundColor: ((index % 2) === 0) ? 'white' : '#cefad0', borderRadius: 10, margin: 4, elevation: 2 }}>
        <List.Item
          title={getTitle()}
          titleNumberOfLines={3}
          titleStyle={{ fontSize: 16, borderBottomColor: '#757575' }}
          description={getSubText(item, type)}
          descriptionNumberOfLines={8}
          descriptionStyle={{ color: '#616161' }}
          left={props => <Avatar.Image size={32} source={(item?.gender == 'F') ? require('../img/femal.jpg') : require('../img/male.jpg')} style={{ alignSelf: 'center', backgroundColor: "#2AAA8A", borderColor: '#2AAA8A', borderWidth: getBorderWidth() }} />}
          right={props => <List.Icon {...props} icon="chevron-right" style={{ alignSelf: 'center' }} />}
        />
      </View>
    </TouchableHighlight>
  );
});

function FormFieldObject(name) {
  this.name = name;
  this.value = "";
  this.setValue = (value) => {
    this.value = value;
  }
  this.getValue = () => {
    return this.value;
  }
}


const refs = {
  name: new FormFieldObject("name"),
  srno: new FormFieldObject("srno"),
  sokno: new FormFieldObject("sokno"),
  partno: new FormFieldObject("partno")

};

const FormField = React.memo(({ label, placeholder, editable, onPress, inRef, inputValue = "", keyboardType = 'default' }) => {
  const [value, setValue] = useState("" + inRef.getValue());

  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={(e) => {
        setValue(e);
        inRef.setValue(e);
      }}
      placeholder={placeholder}
      mode="outlined" // Use outlined mode for better styling
      style={{
        margin: 12,
        borderWidth: 0.2,
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        color: '#000',
        borderColor: '#000',
        borderRadius: 5
      }}
      theme={{ colors: { primary: MD2Colors.amber900, placeholder: '#aaa' } }} // Custom theme
      dense // Compact input style
      editable={editable} // Disable editing if not applicable
      keyboardType={keyboardType}
    />

  )
})


function VoterList({ route }) {
  const contextImport = useBasicImport();
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([]);
  const [page, setPage] = useState();


  const filter = async (pagenumber) => {
    setLoading(true);
    console.log(pagenumber);
    let response = await getCategory(CATEGORY.MULTIPLESEARCHLIST, {
      name: refs.name.getValue(),
      srno: refs.srno.getValue(),
      sokno: refs.sokno.getValue(),
      partno: refs.partno.getValue()
    }, pagenumber);

    try {
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
      filter((!isNaN(parseInt(page)) && parseInt(page) >= 0) ? (parseInt(page) + 1) : 0);
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  return (
    <Layout title={`Search`}  >
      <View style={{ flex: 1 }}>

        <FlatList
          keyExtractor={(item, index) => index.toString()}
          style={{ marginBottom: 8 }}
          data={list}
          renderItem={({ item, index }) => <ListItem item={item} type={route?.params?.type} navigation={contextImport.navigation} index={index} />
          }
          ListFooterComponent={renderFooter}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          initialNumToRender={10} // Number of items to render initially
          maxToRenderPerBatch={10} // Number of items to render per batch
          updateCellsBatchingPeriod={50}
          removeClippedSubviews={true}
          ListHeaderComponent={() => (
            <>
              <FormField
                key={'name'}
                label={`Name`}
                inRef={refs.name}
                onChangeText={(text) => { refs.name.setValue(text) }}
                placeholder={`Enter Name`}
              />

              <FormField
                key={'srno'}
                label={`Sr. No.`}
                inRef={refs.srno}
                onChangeText={(text) => { refs.srno.setValue(text) }}
                placeholder={`Enter Sr. No.`}
              />

              <FormField
                key={'sokno'}
                label={`Voter No.`}
                inRef={refs.sokno}
                onChangeText={(text) => { refs.sokno.setValue(text) }}
                placeholder={`Enter Voter No.`}
              />

              <FormField
                key={'partno'}
                label={`Part No.`}
                inRef={refs.partno}
                onChangeText={(text) => { refs.partno.setValue(text) }}
                placeholder={`Enter Part No.`}
              />

              <Button mode="contained" uppercase={true}
                onPress={() => {
                  setList([])
                  filter(0)
                }}
                style={{ margin: 16, alignSelf: 'stretch' }} >
                Search
              </Button>
            </>
          )}
        />
      </View>
    </Layout>
  )
}

export default VoterList;