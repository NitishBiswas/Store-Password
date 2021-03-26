import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import {Button} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';

class CreateData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      name: '',
      email: '',
      password: '',
      passwordVisible: false,
      nameMark: false,
      emailMark: false,
      showPasswordVisibility: true,
      table: this.props.route.params.tableName,
    };
  }

  fetchData = async () => {
    const response = await fetch('http://192.168.1.2:1111/');
    const information = await response.json();
    this.setState({data: information});
  };
  componentDidMount() {
    this.fetchData();
  }

  changeName(nameText) {
    if (nameText.length !== 0) {
      this.setState({
        name: nameText,
        nameMark: true,
      });
    } else {
      this.setState({
        name: nameText,
        nameMark: false,
      });
    }
  }
  changeEmail(emailText) {
    if (emailText.length !== 0) {
      this.setState({
        email: emailText,
        emailMark: true,
      });
    } else {
      this.setState({
        email: emailText,
        emailMark: false,
      });
    }
  }
  changePassword(pass) {
    if (pass.length !== 0) {
      this.setState({
        password: pass,
        passwordVisible: true,
      });
    } else {
      this.setState({
        password: pass,
        passwordVisible: false,
      });
    }
  }
  showPassword() {
    this.setState({
      showPasswordVisibility: !this.state.showPasswordVisibility,
    });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar backgroundColor="#6a19d7" barStyle="light-content" />
        <Animatable.View
          style={styles.header_login}
          animation="bounce"
          duration={1500}>
          <Text style={styles.welcomeText}>Add Note !</Text>
        </Animatable.View>
        <Animatable.View
          style={styles.footer_login}
          animation="bounceInUp"
          duration={1500}>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
              marginLeft: 42,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
              }}>
              Title
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginBottom: 2,
            }}>
            <TextInput
              style={{
                paddingLeft: 10,
                width: '85%',
                fontWeight: 'bold',
                fontSize: 20,
                borderWidth: 2,
                borderRadius: 30,
                borderColor: '#6a19d7',
              }}
              placeholder="Enter your title"
              value={this.state.name}
              onChangeText={(nameText) => this.changeName(nameText)}
            />
            {this.state.nameMark ? (
              <FontAwesome5
                name="check-circle"
                size={20}
                style={{marginLeft: -100, color: 'green'}}
              />
            ) : null}
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
              marginLeft: 42,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
              }}>
              Username
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginBottom: 2,
            }}>
            <TextInput
              style={{
                paddingLeft: 10,
                width: '85%',
                fontWeight: 'bold',
                fontSize: 20,
                borderWidth: 2,
                borderRadius: 30,
                borderColor: '#6a19d7',
              }}
              keyboardType="email-address"
              placeholder="Enter your username or email"
              value={this.state.email}
              onChangeText={(emailText) => this.changeEmail(emailText)}
            />
            {this.state.emailMark ? (
              <FontAwesome5
                name="check-circle"
                size={20}
                style={{marginLeft: -100, color: 'green'}}
              />
            ) : null}
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
              marginLeft: 42,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
              }}>
              Password
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <TextInput
              style={{
                paddingLeft: 10,
                width: '85%',
                fontWeight: 'bold',
                fontSize: 20,
                borderWidth: 2,
                borderRadius: 30,
                borderColor: '#6a19d7',
              }}
              label="Password"
              mode="outlined"
              secureTextEntry={this.state.showPasswordVisibility}
              placeholder="Enter your password"
              value={this.state.password}
              onChangeText={(pass) => this.changePassword(pass)}
            />
            {this.state.passwordVisible ? (
              <FontAwesome5
                onPress={() => this.showPassword()}
                name={this.state.showPasswordVisibility ? 'eye-slash' : 'eye'}
                size={20}
                style={{marginLeft: -120}}
              />
            ) : null}
          </View>
          <Button
            icon={
              <FontAwesome5
                name="save"
                size={30}
                color="white"
                style={{marginRight: 10}}
              />
            }
            onPress={() => {
              if (
                this.state.name === '' ||
                this.state.email === '' ||
                this.state.password === ''
              ) {
                Alert.alert('Please insert data correctly');
              } else {
                /*this.props.navigation.navigate("Login");*/
                fetch('http://192.168.1.2:1111/', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    Title: this.state.name,
                    Username: this.state.email,
                    Password: this.state.password,
                    table: this.state.table,
                  }),
                })
                  .then((response) => response.json())
                  .then((response) => {
                    Alert.alert('Congratulations! \n New notes added !');
                    this.props.navigation.navigate('Home');
                  })
                  .catch((error) => console.log(error));
              }
            }}
            titleStyle={{fontSize: 20, color: '#fff', fontWeight: 'bold'}}
            containerStyle={[
              styles.buttonStyle,
              {
                borderRadius: 30,
                marginTop: 30,
                borderColor: '#6a19d7',
                borderWidth: 2,
              },
            ]}
            buttonStyle={{backgroundColor: '#6a19d7'}}
            title="Save"
            type="outline"
            raised={true}
          />
          <Button
            onPress={() => this.props.navigation.goBack()}
            titleStyle={{fontSize: 20, color: '#fff', fontWeight: 'bold'}}
            containerStyle={[
              styles.buttonStyle,
              {
                borderRadius: 30,
                marginTop: 20,
                borderColor: '#6a19d7',
                borderWidth: 2,
              },
            ]}
            buttonStyle={{backgroundColor: '#6a19d7'}}
            title="Cancel"
            type="outline"
            raised={true}
          />
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 45,
    color: 'white',
    fontWeight: 'bold',
  },
  header_login: {
    flex: 0.8,
    backgroundColor: '#6a19d7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer_login: {
    shadowColor: 'gray',
    flex: 2.2,
    borderRadius: 50,
    marginTop: -40,
    paddingTop: 25,
    backgroundColor: 'white',
  },
  buttonStyle: {
    marginHorizontal: 30,
    borderRadius: 10,
  },
});

export default CreateData;
