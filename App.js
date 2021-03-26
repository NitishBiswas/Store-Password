import React, {Component} from 'react';
import Login from './Screen/Login';
import SplashScreen from './Screen/SplashScreen';
import RegistrationScreen from './Screen/RegistrationScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './Screen/HomeScreen';
import ProfileScreen from './Screen/ProfileScreen';
import CreateData from './Screen/CreateData';
import DetailScreen from './Screen/DetailScreen';
import UpdateProfile from './Screen/UpdateProfile';

const stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{headerShown: false}}
          />
          <stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: null,
            }}
          />
          <stack.Screen
            name="Create Note"
            component={CreateData}
            options={{
              headerShown: null,
            }}
          />
          <stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              headerStyle: {
                backgroundColor: '#6a19d7',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                marginLeft: -25,
              },
            }}
          />
          <stack.Screen
            name="Details"
            component={DetailScreen}
            options={{
              headerStyle: {
                backgroundColor: '#6a19d7',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                marginLeft: -25,
              },
            }}
          />
          <stack.Screen
            name="Update"
            component={UpdateProfile}
            options={{
              headerStyle: {
                backgroundColor: '#6a19d7',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                marginLeft: -25,
              },
            }}
          />
        </stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
