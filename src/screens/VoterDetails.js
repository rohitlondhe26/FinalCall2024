import React, { useState } from 'react'
import { View, ScrollView, Linking, Platform, StyleSheet } from 'react-native'
import useBasicImport from './BaseScreen'
import { Card, Title, Paragraph, Avatar, Subheading, Caption, Divider, IconButton, Button, List } from 'react-native-paper'
import Layout from './Layout';
import { getUpdateVoter } from './api';
// import DatabaseHelper from './DatabaseHelper';


function VoterDetails() {

  const contextImport = useBasicImport();
  const [voted, setVoted] = useState();
  const [voter, setvoter] = React.useState(JSON.parse(contextImport.route?.params?.item));
  const scrollViewRef = React.useRef();
  const smsTemplate = `उमेदवार: बाळा नांदगावकर \n महाराष्ट्र नवनिर्माण सेना \n निशाणी : रेल्वे इंजिन \n आपली शिवडी-आपला बाळा \n\n Candidate: Bala Nandgaonkar \n Maharashtra Navnirman Sena \n symbol: Railway Engine \n Aapli Shivdi-Aapla Bala \n\n  Polling booth - ${voter?.psbuilding_name_en} \n\n ${voter?.psbuilding_name_v1}`;

  const [loading, setLoading] = React.useState(false)

  async function openUrl(url) {
    return await Linking.openURL(url);
  }

  function getSMSDivider() {
    return Platform.OS === "ios" ? "&" : "?";
  }


  const getMobileDetails = () => {
    if (voter?.mobile_no && (voter?.mobile_no).toString().toLowerCase() != ("NULL").toLowerCase()) {
      return voter?.mobile_no;
    }
    return "NA";
  }

  const handleRefresh = () => {
    setLoading(true);
    const updateVoter = async () => {
      try {
        let res = await getUpdateVoter(voter?.epic_no);
        console.log("--->", res?.data)
        setvoter(res?.data?.data);
      } catch (error) {
        console.log("--->", error)

      }
      setLoading(false);
    }
    updateVoter();

  }



  return (
    <Layout title={`Voter Information`} loading={loading}>
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'space-between' }}>
        <ScrollView ref={scrollViewRef} >
          <Card style={{ margin: 16 }}>
            <Card.Title
              title={<Title>{`${voter?.fm_name_v1} ${voter?.lastname_v1}`} </Title>}
              subtitle={`${voter?.fm_name_en} ${voter?.lastname_en}`}
              left={() => <Avatar.Image size={48} source={(voter?.gender == 'F') ? require('../img/femal.jpg') : require('../img/male.jpg')} />}
              right={() => <Button mode="contained" style={{ backgroundColor: voted ? 'green' : 'red' }} textColor='white' onPress={() => setVoted(!voted)}>{voted ? 'Voted' : 'Pending'}</Button>}
              style={{ marginRight: 16 }}
            />
            <Card.Content>
              <Divider style={{ marginVertical: 4 }} />
              <Row style={{ marginVertical: 4 }}>
                <RowCol label={'AC No'} value={`${"183"}`} />
                <View style={{
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: '#616161',
                  marginHorizontal: 10,
                  marginBottom: 10
                }} />
                <RowCol label={'Part No'} value={`${voter?.part_no || "NA"}`} />
                <View style={{
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: '#616161',
                  marginHorizontal: 10,
                  marginBottom: 10
                }} />
                <RowCol label={'Sr No'} value={`${voter?.slnoinpart || "NA"}`} />
              </Row>
              {/* code added by swapnal on 18.02.2022 */}
              <Divider style={{ marginVertical: 4 }} />
              <Row style={{ marginVertical: 4 }}>
                <RowCol label={'Ward No'} value={`${voter?.mc_ward_no || "NA"}`} />
                <View style={{
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: '#616161',
                  marginHorizontal: 10,
                  marginBottom: 10
                }} />
                <RowCol label={'New Part No'} value={`${voter?.part_no_new || "NA"}`} />
                <View style={{
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: '#616161',
                  marginHorizontal: 10,
                  marginBottom: 10
                }} />
                <RowCol label={'New Sr No'} value={`${voter?.slnoinpart_new || "NA"}`} />
              </Row>

              {/* code commented by swapnal cahnged the layout on 18.02.2022 */}
              {/* <Row label={'Ward No'} value={`${voter?.MC_WARD_SRNO || "NA"}`} />
              <Row label={'Ward Sr No'} value={`${voter?.MC_WARD_NO || "NA"}`} /> */}
              {/* <Row label={'Address'} value={`${voter?.C_HOUSE_NO_V1}, ${voter?.PSBuilding_Name_v1}\n\n${voter?.C_HOUSE_NO}, ${voter?.PSBuilding_Name_En}`} /> */}
              <Row label={'Address'} value={`${voter?.c_house_no_v1}, ${voter?.section_name_v1}\n\n${voter?.c_house_no}, ${voter?.section_name_en}`} />

              <Row label={'Pincode'} value={`${voter?.pincode}`} />
              <Row label={'Gender/Age'} value={`${voter?.gender}/${voter?.age}`} />
              <Row label={'Mobile No'} value={getMobileDetails()} />
              <Row label={'IDCard No'} value={`${voter?.epic_no}`} />
              {/* <Row label={'Pollin Booth'} value={`${voter?.PSBuilding_Name_v1},${voter?.Section_Name_v1} \n\n${voter?.PSBuilding_Name_En},${voter?.Section_Name_En}`} /> */}
              <Row label={'Language'} value={`${voter?.language || "NA"}`} />
              <Row label={'Email'} value={`${voter?.email || "NA"}`} />
              <Row label={'Voter Type'} value={`${voter?.votertype || "NA"}`} />
              <Row label={'Remark'} value={`${voter?.areatype || "NA"}`} />
              <Row label={'Polling booth'} value={`${voter?.psbuilding_name_en || "NA"}`} />
              <Row label={' '} value={`${voter?.psbuilding_name_v1 || "NA"}`} />

            </Card.Content>
            {/* <Card.Actions style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
          
              <IconButton
                icon='phone'
                size={24}
                color={'#fff'}
                disabled={getMobileDetails() == "NA" ? true : false}
                style={{ backgroundColor: '#00695C', alignSelf: 'center' }}
                onPress={async () => {
                  await openUrl(`tel:${getMobileDetails()}`)
                }}
              />
              <IconButton
                icon='message-processing'
                size={24}
                color={'#fff'}
                disabled={getMobileDetails() == "NA" ? true : false}
                style={{ backgroundColor: '#FFA000', alignSelf: 'center' }}
                onPress={async () => {
                  await openUrl(`sms:${getMobileDetails()}${getSMSDivider()}body=${smsTemplate}`)

                }}
              />
              <IconButton
                icon='account-edit'
                size={24}
                color={'#fff'}
                style={{ backgroundColor: '#FFA000', alignSelf: 'center' }}
                onPress={() => {
                  console.log("INSIDE")
                  contextImport.navigation.navigate('UpdateVoterDetails', { item: JSON.stringify(voter) })
                }}
              />

              <IconButton
                icon='refresh-circle'
                size={24}
                color={'#fff'}
                style={{ backgroundColor: '#FFA000', alignSelf: 'center' }}
                onPress={() => {
                  handleRefresh()
                }}
              />

             
            </Card.Actions> */}
          </Card>

        </ScrollView>

      </View>
    </Layout>
  );
}



const Row = ({ label, value, children, style }) => {

  if (children) {
    return <View style={[{ flexDirection: 'row', flex: 1 }, style]}>
      {children}
    </View>
  }

  return <View style={{ flex: 1 }}>
    <View style={{ flexDirection: 'row' }}>
      <Caption style={{ flex: 0.4 }}>{label}</Caption>
      <Paragraph style={{ flex: 0.6 }}>{value}</Paragraph>
    </View>
    <Divider style={{ marginVertical: 4 }} />
  </View>
}

{/* code added by swapnal on 18.02.2022 */ }

const RowCol = ({ label, value, children, style }) => {

  if (children) {
    return <View style={[{ flexDirection: 'row', flex: 1 }, style]}>
      {children}
    </View>
  }

  return <View style={{ flex: 1 }}>
    <View style={{ flexDirection: 'row' }}>
      <Caption style={{ flex: 0.5 }}>{label}</Caption>
      <Paragraph style={{ flex: 0.5 }}>{value}</Paragraph>
    </View>
    <Divider style={{ marginVertical: 3 }} />
  </View>
}

export default VoterDetails;