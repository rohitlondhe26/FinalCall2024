import React, { useState } from 'react'
import { View, Image, KeyboardAvoidingView, ScrollView, Alert, Text } from 'react-native'

import { Button, Headline, MD2Colors, TextInput, Title } from 'react-native-paper';
import { Caption, Divider } from 'react-native-paper'
import useBasicImport from './BaseScreen'
import { login } from './api';
import Config from 'react-native-config';
var SharedPreferences = require('react-native-shared-preferences');


function Login() {
  const contextImport = useBasicImport()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // console.log('Config', Config);

  const onLogin = async () => {
    let error = { username: '', password: '' },
      errorOccured = false;
    if (!username || !username.length > 0) {
      errorOccured = true;
      error.username = "Username not be empty!!!";
    }

    if (!password || !password.length > 0) {
      errorOccured = true;
      error.password = "Password not be empty!!!"
    }

    if (errorOccured) { setError(error); }
    else {
      setLoading(true);
      try {
        const response = await login(username, password);
        console.log('response');
        console.log(response.data);
        const res = response.data;
        if (!res?.data) {
          Alert.alert(
            "Error",
            res?.errors[0].error,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
          );
        }
        else {
          SharedPreferences.setItem("AuthKey", res?.data.token);
          SharedPreferences.setItem("userName", res?.data.userName);
          contextImport.navigation.navigate('Landing');
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white', justifyContent: 'center' }}>
        <Image
          resizeMode='contain'
          resizeMethod='auto'
          style={{ width: '100%', height: '100%' }}
          source={{ uri: 'http://onusapi.onus-tech.in/logo.jpeg', method: 'GET', }}
        />
      </View>
      <ScrollView style={{ flex: 4, margin: 8 }}>
        <View style={{ flex: 1, margin: 4 }}>
          <Headline style={{ marginBottom: 30, alignSelf: 'center', fontWeight: 'bold' }}>Final Call</Headline>
          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            error={error.username}
            keyboardType="default"
            style={{ margin: 4, marginTop: 16, backgroundColor: 'transparent' }}
            left={<TextInput.Icon name="account-outline" style={{ margin: 4, alignSelf: 'flex-end' }} />}
          />

          <TextInput
            label="MPIN"
            value={password}
            onChangeText={setPassword}
            style={{ margin: 4, backgroundColor: 'transparent' }}
            secureTextEntry
            error={error.password}
            keyboardType="default"
            left={<TextInput.Icon name="lock-outline" style={{ margin: 4, alignSelf: 'flex-end' }} />}
          />

          <Divider style={{ marginVertical: 4 }} />

          <Row style={{ marginVertical: 4 }}>

            <View style={{
              marginHorizontal: 5,
              flex: 1
            }}>
              <Button mode="contained" uppercase={true} disabled={loading} loading={loading}
                onPress={() => {
                  onLogin()
                  // contextImport.navigation.navigate('Landing')
                }}
                style={{ marginTop: 16 }} >
                Login
              </Button>
            </View>
          </Row>
          <Divider style={{ marginVertical: 12 }} />
          <Text style={{ textAlign: 'center', color: MD2Colors.amber900 }}>App Version: {Config.VERSION_NAME}</Text>
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
      <Caption style={{ flex: 1.0 }}>{label}</Caption>
      {/* <Paragraph style={{ flex: 0.5 }}>{value}</Paragraph> */}
    </View>
    <Divider style={{ marginVertical: 4 }} />
  </View>
}

export default Login;