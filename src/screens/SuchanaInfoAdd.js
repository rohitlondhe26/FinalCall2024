import React, { useState } from 'react'
import { View, KeyboardAvoidingView, ScrollView, Alert } from 'react-native'
import { Button, Headline, TextInput } from 'react-native-paper';
import { Caption, Divider } from 'react-native-paper'
import useBasicImport from './BaseScreen'
import Layout from './Layout';

import { submitSuchnaInfo } from './api'

function SuchanaInfoAdd() {
  const contextImport = useBasicImport();
  const [suchana, setSuchana] = useState("");
  const [error, setError] = useState("");

  const onProcess = async () => {
    let error = { },
      errorOccured = false;
   

    if (!suchana || !suchana.length > 0) {
      errorOccured = true;
      error.suchana = "Suchana can not be empty!!!"
    }

    if (errorOccured) { setError(error); }
    else {

      try {
        const response = await submitSuchnaInfo(suchana);

        const res = response.data;
        if (res?.responseCode != "0") {
          Alert.alert(
            "Error",
            res.response,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
          );
        }
        else {
          Alert.alert(
            "Success",
            res.response,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
          );
          contextImport.navigation.pop(2);
          contextImport.navigation.navigate("Suchana");
        }

      } catch (e) {
        console.log(e);
      }
    }
  }

  //Registration
  const onCancel = async () => {
    contextImport.navigation.goBack();
  }

  return (<Layout title="Add Suchana">
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <ScrollView style={{ flex: 4, margin: 8 }}>
        <View style={{ flex: 1, margin: 4 }}>

          <TextInput
            label="Suchana"
            value={suchana}
            onChangeText={setSuchana}
            style={{ margin: 4, backgroundColor: 'transparent' }}
            error={error.votingcount}
            mode='outlined'
            />

          <Divider style={{ marginVertical: 4 }} />

          <Row style={{ marginVertical: 4 }}>
            <View style={{
              alignItems: "center",
              width: '50%',
              marginHorizontal: 5,

            }}>
              <Button mode="contained" uppercase={true}
                onPress={() => {
                  onCancel()
                  // contextImport.navigation.navigate('Landing') 
                }}
                style={{ marginTop: 16, alignSelf: 'stretch' }} >
                Cancel
              </Button>
            </View>
            <View style={{
              alignItems: "center",
              width: '50%',
              marginHorizontal: 5,

            }}>
              <Button mode="contained" uppercase={true}
                onPress={() => {
                  onProcess()
                  // contextImport.navigation.navigate('Landing') 
                }}
                style={{ marginTop: 16, alignSelf: 'stretch' }} >
                Submit
              </Button>
            </View>
          </Row>
          <Divider style={{ marginVertical: 12 }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </Layout>
  );
}

// code added by swapnal to deal with Registration view

const Row = ({ label, value, children, style }) => {

  if (children) {
    return <View style={[{ flexDirection: 'row', flex: 1 }, style]}>
      {children}
    </View>
  }

  return <View style={{ flex: 1 }}>
    <View style={{ flexDirection: 'row' }}>
      <Caption style={{ flex: 1.0 }}>{label}</Caption>
      {/* <Paragraph style={{ flex: 0.5 }}>{value}</Paragraph> */}
    </View>
    <Divider style={{ marginVertical: 4 }} />
  </View>
}

export default SuchanaInfoAdd;