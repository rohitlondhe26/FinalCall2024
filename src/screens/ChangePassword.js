import React, { useState } from 'react'
import { View, KeyboardAvoidingView, ScrollView, Alert } from 'react-native'
import { Button, Headline, TextInput, Title } from 'react-native-paper';
import { Caption, Divider } from 'react-native-paper'
import useBasicImport from './BaseScreen'

import {changepassword} from './api'

function ChangePassword() {
  const contextImport = useBasicImport()
  // const [authcode, setAuthcode] = useState("009001");
  // const [mobileno, setMobileno] = useState("9987930007");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const onProcess = async () => {
    let error = { authcode: '', mobileno: '' },
      errorOccured = false;
    // if (!authcode || !authcode.length > 0) {
    //   errorOccured = true;
    //   error.authcode = "Auth Code can not be empty!!!";
    // }

    // if (!mobileno || !mobileno.length > 0) {
    //   errorOccured = true;
    //   error.mobileno = "Mobile Number can not be empty!!!"
    // }

    if (!username || !username.length > 0) {
      errorOccured = true;
      error.username = "Username can not be empty!!!"
    }

    //validation for password
    if (!password || !password.length > 0) {
      errorOccured = true;
      error.password = "Password can not be empty!!!"
    }

    //validation for new password
    if (!newpassword || !newpassword.length > 0) {
      errorOccured = true;
      error.newpassword = "New Password can not be empty!!!"
    }

    if (errorOccured) { setError(error); }
    else {

      try {
        const response = await changepassword(username,password,newpassword);
        
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
            contextImport.navigation.navigate('Login');
        }
        
      } catch (e) {
        console.log(e);
      }
    }
  }

  //Registration
  const onCancel = async () => {
    contextImport.navigation.navigate('Login');
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <ScrollView style={{ flex: 4, margin: 8 }}>
        <View style={{ flex: 1, margin: 4 }}>
        <Headline style={{ marginBottom: 30, alignSelf: 'center', fontWeight: 'bold' }}>Election Management Software</Headline>
        <Headline style={{ marginBottom: 20, alignSelf: 'center', fontWeight: 'bold' }}>Shivadi - 183</Headline>
          <Title style={{ alignSelf: 'center', margin: 16 }}>Change Password</Title>
          {/* <TextInput
            label="Auth Code"
            value={authcode}
            onChangeText={setAuthcode}
            error={error.authcode}
            keyboardType="numeric"
            style={{ margin: 4, marginTop: 16, backgroundColor: 'transparent' }}
            left={<TextInput.Icon name="home" style={{ margin: 4, alignSelf: 'flex-end' }} />}
          /> */}

          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            style={{ margin: 4, backgroundColor: 'transparent' }}
            error={error.mobileno}
            keyboardType="numeric"
            left={<TextInput.Icon name="account-outline" style={{ margin: 4, alignSelf: 'flex-end' }} />}
          />

          <TextInput
            label="Current Password"
            value={password}
            onChangeText={setPassword}
            style={{ margin: 4, backgroundColor: 'transparent' }}
            error={error.password}
            secureTextEntry={true}
            left={<TextInput.Icon name="lock-outline" style={{ margin: 4, alignSelf: 'flex-end' }} />}
          />

          <TextInput
            label="New Password"
            value={newpassword}
            onChangeText={setNewPassword}
            style={{ margin: 4, backgroundColor: 'transparent' }}
            error={error.newpassword}
            keyboardType="numeric"
            secureTextEntry={true}
            left={<TextInput.Icon name="lock-outline" style={{ margin: 4, alignSelf: 'flex-end' }} />}
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
                  style={{ marginTop: 16, alignSelf: 'stretch'  }} >
                  Process
                </Button>
            </View>
          </Row>
          <Divider style={{ marginVertical: 12 }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
      <Caption style={{ flex:1.0 }}>{label}</Caption>
      {/* <Paragraph style={{ flex: 0.5 }}>{value}</Paragraph> */}
    </View>
    <Divider style={{ marginVertical: 4 }} />
  </View>
}

export default ChangePassword;