import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  Modal,
} from 'react-native';
import {Button} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      email: '',
      password: '',
      passwordVisible: false,
      textMark: false,
      showPasswordVisibility: true,
      success: false,
      modalView: false,
      modalSetPassword: false,
    };
  }
  fetchData = async () => {
    const response = await fetch('http://192.168.1.2:1111/registration');
    const information = await response.json();
    this.setState({data: information});
  };
  componentDidMount() {
    this.fetchData();
  }
  changeText(text) {
    if (text.length !== 0) {
      this.setState({
        email: text,
        textMark: true,
      });
    } else {
      this.setState({
        email: text,
        textMark: false,
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
          <Text style={styles.welcomeText}>Login !</Text>
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
            <FontAwesome5
              name="envelope"
              size={30}
              style={{color: '#6a19d7'}}
            />
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                marginLeft: 10,
              }}>
              E-mail
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginBottom: 10,
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
              label="Email"
              mode="outlined"
              placeholder="Enter your email"
              value={this.state.email}
              onChangeText={(text) => this.changeText(text)}
            />
            {this.state.textMark ? (
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
            <FontAwesome5 name="lock" size={30} style={{color: '#6a19d7'}} />
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                marginLeft: 10,
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
                name="sign-in-alt"
                size={30}
                color="white"
                style={{marginRight: 10}}
              />
            }
            onPress={() => {
              if (this.state.email === '' || this.state.password === '') {
                Alert.alert('Please insert data correctly');
              } else {
                fetch('http://192.168.1.2:1111/registration', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    Gmail: this.state.email,
                    Password: this.state.password,
                    Note: 'Create Note',
                  }),
                })
                  .then((response) => response.json())
                  .then((response) => {
                    if (response.length) {
                      this.props.navigation.navigate('Home', {
                        tableName: this.state.email,
                      });
                    } else {
                      Alert.alert('Wrong Password !');
                    }
                  })
                  .catch((error) => console.log(error));
              }
            }}
            containerStyle={[
              styles.buttonStyle,
              {
                borderRadius: 30,
                marginTop: 20,
                borderWidth: 2,
                borderColor: '#6a19d7',
                backgroundColor: '#6a19d7',
              },
            ]}
            buttonStyle={{backgroundColor: '#6a19d7'}}
            title="LogIn"
            titleStyle={{fontSize: 20, color: 'white', fontWeight: 'bold'}}
            raised={true}
          />
          <Button
            icon={
              <FontAwesome5
                name="user-plus"
                size={30}
                color="#6a19d7"
                style={{marginRight: 10}}
              />
            }
            onPress={() => this.props.navigation.navigate('Registration')}
            titleStyle={{fontSize: 20, color: '#6a19d7', fontWeight: 'bold'}}
            containerStyle={[
              styles.buttonStyle,
              {
                borderRadius: 30,
                marginTop: 20,
                borderColor: '#6a19d7',
                borderWidth: 2,
              },
            ]}
            title="Registration"
            type="outline"
            raised={true}
          />
          <TouchableOpacity onPress={() => this.setState({modalView: true})}>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <FontAwesome5 name="frown" size={25} style={{color: '#6a19d7'}} />
              <Text
                style={{fontSize: 20, color: '#6a19d7', fontWeight: 'bold'}}>
                Forgot Password ?
              </Text>
            </View>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalView}
            onRequestClose={() => {
              this.setState({modalView: false});
            }}>
            <View style={styles.modal}>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                  marginLeft: 42,
                  alignItems: 'center',
                }}>
                <FontAwesome5
                  name="envelope"
                  size={30}
                  style={{color: 'white'}}
                />
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginLeft: 10,
                    color: 'white',
                  }}>
                  E-mail
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginBottom: 10,
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
                    backgroundColor: 'white',
                    color: 'black',
                  }}
                  label="Email"
                  mode="outlined"
                  placeholder="Enter your email"
                  keyboardType={'email-address'}
                  value={this.state.email}
                  onChangeText={(text) => this.changeText(text)}
                />
                {this.state.textMark ? (
                  <FontAwesome5
                    name="check-circle"
                    size={20}
                    style={{marginLeft: -100, color: 'green'}}
                  />
                ) : null}
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Button
                  onPress={() => this.setState({modalView: false})}
                  titleStyle={{
                    fontSize: 20,
                    color: '#6a19d7',
                    fontWeight: 'bold',
                  }}
                  containerStyle={{
                    borderRadius: 30,
                    borderColor: '#6a19d7',
                    borderWidth: 2,
                    width: 120,
                  }}
                  title="Cancel"
                  type="outline"
                  raised={true}
                />
                <Button
                  icon={
                    <FontAwesome5
                      name="chevron-right"
                      size={15}
                      color="#6a19d7"
                      style={{marginLeft: 5}}
                    />
                  }
                  onPress={() => {
                    fetch('http://192.168.1.2:1111/registration', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        Gmail: this.state.email,
                        Check: 'Check',
                      }),
                    })
                      .then((response) => response.json())
                      .then((response) => {
                        this.setState({modalSetPassword: true});
                        this.setState({modalView: false});
                      })
                      .catch((error) => console.log(error));
                  }}
                  iconRight={true}
                  titleStyle={{
                    fontSize: 20,
                    color: '#6a19d7',
                    fontWeight: 'bold',
                  }}
                  containerStyle={{
                    borderRadius: 30,
                    borderColor: '#6a19d7',
                    borderWidth: 2,
                    width: 120,
                  }}
                  buttonStyle={{backgroundColor: 'white', borderRadius: 30}}
                  title="Send"
                  type="outline"
                  raised={true}
                />
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalSetPassword}
            onRequestClose={() => {
              this.setState({modalSetPassword: false});
            }}>
            <View style={styles.modal}>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                  marginLeft: 42,
                  alignItems: 'center',
                }}>
                <FontAwesome5 name="lock" size={30} style={{color: 'white'}} />
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginLeft: 10,
                    color: 'white',
                  }}>
                  New Password
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
                    backgroundColor: 'white',
                    color: 'black',
                  }}
                  label="Password"
                  mode="outlined"
                  secureTextEntry={this.state.showPasswordVisibility}
                  placeholder="Enter new password"
                  value={this.state.password}
                  onChangeText={(pass) => this.changePassword(pass)}
                />
                {this.state.passwordVisible ? (
                  <FontAwesome5
                    onPress={() => this.showPassword()}
                    name={
                      this.state.showPasswordVisibility ? 'eye-slash' : 'eye'
                    }
                    size={20}
                    style={{marginLeft: -120}}
                  />
                ) : null}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 10,
                }}>
                <Button
                  onPress={() => this.setState({modalSetPassword: false})}
                  titleStyle={{
                    fontSize: 20,
                    color: '#6a19d7',
                    fontWeight: 'bold',
                  }}
                  containerStyle={{
                    borderRadius: 30,
                    borderColor: '#6a19d7',
                    borderWidth: 2,
                    width: 120,
                  }}
                  title="Cancel"
                  type="outline"
                  raised={true}
                />
                <Button
                  icon={
                    <FontAwesome5
                      name="save"
                      size={20}
                      color="#6a19d7"
                      style={{marginRight: 5}}
                    />
                  }
                  onPress={() => {
                    fetch('http://192.168.1.2:1111/registration', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        Gmail: this.state.email,
                        Password: this.state.password,
                        NewPassword: 'Password',
                      }),
                    })
                      .then((response) => response.json())
                      .then((response) => {
                        Alert.alert(
                          'Congratulations! \n Your new password has been saved !',
                        );
                        this.setState({modalSetPassword: false});
                      })
                      .catch((error) => console.log(error));
                  }}
                  titleStyle={{
                    fontSize: 20,
                    color: '#6a19d7',
                    fontWeight: 'bold',
                  }}
                  containerStyle={{
                    borderRadius: 30,
                    borderColor: '#6a19d7',
                    borderWidth: 2,
                    width: 120,
                  }}
                  buttonStyle={{backgroundColor: 'white', borderRadius: 30}}
                  title="Save"
                  type="outline"
                  raised={true}
                />
              </View>
            </View>
          </Modal>
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
    flex: 1,
    backgroundColor: '#6a19d7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer_login: {
    shadowColor: 'gray',
    flex: 2,
    borderRadius: 50,
    marginTop: -40,
    paddingTop: 25,
    backgroundColor: 'white',
  },
  buttonStyle: {
    borderRadius: 10,
    marginHorizontal: 30,
  },
  modal: {
    backgroundColor: '#6a19d7',
    bottom: '40%',
    marginLeft: '5%',
    borderRadius: 40,
    height: 170,
    width: '90%',
    position: 'absolute',
  },
});

export default Login;
