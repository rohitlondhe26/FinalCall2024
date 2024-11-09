//icon={{ name: 'search', type: 'ionicon', color: 'white' }}
//icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
// icon={{ name: 'home', type: 'ionicon', color: 'white' }} 


import React, { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Headline, TextInput } from 'react-native-paper';
import Input from '../components/Input'
import { useSelector } from 'react-redux';
import Linearlayout from '../components/Linearlayout';
import Loader from '../components/Loader';
import { useAthentication } from '../core';
import { useInputTextHandler, createAlert } from '../components/utility';
import { emailValidate } from '../utility/validator';
import { useIsFocused } from '@react-navigation/native';

export default function Login() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const authenticationService = useAthentication();
  const username = useInputTextHandler('rohit@gmail.com');
  const password = useInputTextHandler('');
  const [error, setError] = useState({ email: '', password: '' })

  const [loading, setLoading] = useState(false);
  const loginResponse = useSelector(state => state.user.token);

  useEffect(() => {
    console.log(JSON.stringify(loginResponse));
    if (isFocused) {
      if (loginResponse !== null) {
        if (loginResponse?.status) {
          if (loginResponse.data.IncompleteProfile)
            navigation.push('OnBoarding');
          else
            navigation.navigate('Profile');
        } else {
          createAlert('Error', loginResponse?.message);
        }
      }
      setLoading(false);
    }
  }, [loginResponse])


  const onLogin = () => {
    console.log('onLogin');
    let errorValue = { email: '', password: '' };
    let isUsernameValid = emailValidate(username.value);
    let isPasswordValid = password.value?.length > 4 ? true : false;
    if (!isUsernameValid) {
      errorValue.email = "Please enter valid username";
      if (!isPasswordValid)
        errorValue.password = "Please enter valid password";
      setError(errorValue);
    }
    else {
      setError(errorValue);
      setLoading(true);
      authenticationService.login(username.value, password.value)
    }
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Linearlayout>
        <Linearlayout style={{ flex: 1, alignItems: 'center' }}>
          <Image
            resizeMode='contain'
            style={{ flex: 1 }}
            source={require('../../assets/images/splashLogo.png')} />

          <Image
            resizeMode='contain'
            style={{ flex: 1, padding: 36 }}
            source={require('../../assets/images/loginBuddy.png')} />
        </Linearlayout>
        <ScrollView style={{ flex: 3, margin: 8 }} >
          <Linearlayout>

            <Headline style={{ alignSelf: 'center', margin: 16 }}>Welcome back!</Headline>

            <Input
              label="Email"
              {...username}
              errorMessage={error.email}
              style={{ margin: 4, marginTop: 16, backgroundColor: 'transparent' }}
              left={<TextInput.Icon name="email-outline" style={{ margin: 4, alignSelf: 'flex-end' }} />}
            />

            <Input
              label="Password"
              {...password}
              errorMessage={error.password}
              style={{ margin: 4, backgroundColor: 'transparent' }}
              secureTextEntry
              left={<TextInput.Icon name="lock-outline" style={{ margin: 4, alignSelf: 'flex-end' }} />}
            />

            <Button mode="contained" uppercase={true} onPress={onLogin} style={{ margin: 4, marginTop: 16 }} >
              Login
            </Button>

            <Linearlayout horizontal style={{ alignSelf: 'center' }}>
              <Button mode="flat" compact uppercase={false} onPress={() => navigation.navigate('ForgotPassword')} style={{ margin: 4 }} >
                Forgot password?
              </Button>
              <Text style={{ alignSelf: 'center' }} > | </Text>
              <Button mode="flat" compact uppercase={false} onPress={() => navigation.navigate('Register')} style={{ margin: 4 }}>
                Create an Account
              </Button>
            </Linearlayout>
          </Linearlayout>
        </ScrollView>
        <Loader loading={loading}/>
      </Linearlayout>
    </KeyboardAvoidingView>
  );
}
