import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

class SplashScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar backgroundColor="#6a19d7" barStyle="light-content" />
        <Animatable.View
          style={styles.header_login}
          animation="bounce"
          duration={1500}>
          <Animatable.Image
            source={require('../Images/logo.jpg')}
            style={{
              height: 250,
              width: 250,
              borderRadius: 125,
              borderColor: 'white',
              borderWidth: 4,
            }}
            animation="bounceInUp"
            duration={1500}
          />
          <Text style={styles.welcomeText}>Welcome !</Text>
        </Animatable.View>
        <Animatable.View
          style={styles.footer_login}
          animation="bounceInUp"
          duration={1500}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              marginTop: 30,
              marginLeft: 15,
            }}>
            Stay connected to save passwords !
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 20,
              marginLeft: 15,
            }}>
            Sign-In with account.
          </Text>
          <Button
            icon={
              <Icon
                name="arrow-right"
                size={30}
                color="white"
                style={{marginLeft: 10}}
              />
            }
            onPress={() => this.props.navigation.navigate('Login')}
            iconRight={true}
            containerStyle={{
              borderRadius: 30,
              marginTop: 10,
              marginLeft: '50%',
              borderWidth: 2,
              borderColor: '#6a19d7',
              backgroundColor: '#6a19d7',
              width: 180,
            }}
            buttonStyle={{backgroundColor: '#6a19d7'}}
            title="Get Started"
            titleStyle={{fontSize: 20, color: 'white', fontWeight: 'bold'}}
            raised={true}
          />
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 35,
    color: 'white',
    fontWeight: 'bold',
  },
  header_login: {
    flex: 2,
    backgroundColor: '#6a19d7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer_login: {
    shadowColor: 'gray',
    flex: 1,
    borderRadius: 50,
    marginTop: -40,
    backgroundColor: 'white',
  },
  buttonStyle: {
    padding: 3,
    width: 180,
    marginTop: 10,
    borderRadius: 10,
    marginLeft: '50%',
  },
});

export default SplashScreen;
