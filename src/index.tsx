// src/MyStack.js
import * as React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { Login,  VoterDetails,  Landing,   SearchListByMultiple, SearchListByVoterType } from './screens'

const Stack = createStackNavigator();


function MyStack() {
   

    return (
        <PaperProvider theme={{ version: 2, colors:{ primary: '#ed9440'} }}>

            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Landing" component={Landing} />
                <Stack.Screen name="SearchListByMultiple" component={SearchListByMultiple} /> 
                <Stack.Screen name="VoterDetails" component={VoterDetails} />
                {/* <Stack.Screen name="SurveryForm" component={SurveryForm}  />
                <Stack.Screen name="SurveryList" component={SurveyList} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="SearchListByName" component={SearchListByName} />
                <Stack.Screen name="SearchListByFirstName" component={SearchListByFirstName} />
                <Stack.Screen name="SearchListByLastName" component={SearchListByLastName} />
                <Stack.Screen name="SearchListGender" component={SearchListGender} />
                <Stack.Screen name="SearchListByBirthday" component={SearchListByBirthday} />
                <Stack.Screen name="SearchListByAddress" component={SearchListByAddress} />
                <Stack.Screen name="SearchListByNumber" component={SearchListByNumber} />
                <Stack.Screen name="SearchListByPincode" component={SearchListByPincode} />
                <Stack.Screen name="SearchListAge" component={SearchListAge} />
                <Stack.Screen name="Reports" component={Reports} />
                <Stack.Screen name="Voter List" component={VoterList} />
                
                <Stack.Screen name="SearchList" component={SearchListByGlobal} />
                <Stack.Screen name="SearchListDuplicate" component={SearchListDuplicate} />
                <Stack.Screen name="SearchListByLanguage" component={SearchListByLanguage} />
                <Stack.Screen name="PollingBooth" component={PollingBooth} />
                <Stack.Screen name="Surnamewise" component={Surnamewise} />
                <Stack.Screen name="Registration" component={Registration} />
                <Stack.Screen name="RegistrationConfirmation" component={RegistrationConfirmation} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} />
                <Stack.Screen name="Details" component={DetailsScreen} />
                <Stack.Screen name="UpdateVoterDetails" component={UpdateVoterDetails} />
                <Stack.Screen name="Notification" component={Notification} />
                <Stack.Screen name="Suchana" component={Suchana} />
                <Stack.Screen name="SuchanaAddInfo" component={SuchanaInfoAdd} />
                <Stack.Screen name="VotingInfo" component={VotingInfo} />
                <Stack.Screen name="VotingInfoAdd" component={VotingInfoAdd} /> 
                <Stack.Screen name="SearchListByVoterType" component={SearchListByVoterType} />  */}
            </Stack.Navigator>

        </PaperProvider>
    );
}

export default MyStack;
