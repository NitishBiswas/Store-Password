import React, {Component} from 'react';
import {
  View,
  Text,
  Modal,
  StatusBar,
  TextInput,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Button, Card} from 'react-native-elements';
class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.route.params.title,
      userName: this.props.route.params.userName,
      password: this.props.route.params.password,
      id: this.props.route.params.id,
      table: this.props.route.params.table,
      modalVisible: false,
      data: '',
      passwordVisible: true,
      nameMark: true,
      emailMark: true,
      showPasswordVisibility: true,
    };
  }

  changeName(nameText) {
    if (nameText.length !== 0) {
      this.setState({
        title: nameText,
        nameMark: true,
      });
    } else {
      this.setState({
        title: nameText,
        nameMark: false,
      });
    }
  }
  changeEmail(emailText) {
    if (emailText.length !== 0) {
      this.setState({
        userName: emailText,
        emailMark: true,
      });
    } else {
      this.setState({
        userName: emailText,
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
      <View style={{flex: 1, backgroundColor: '#f2fdfb'}}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#6a19d7',
            alignItems: 'center',
            paddingTop: 30,
            paddingBottom: 65,
          }}>
          <Image
            source={require('../Images/logo.jpg')}
            style={{
              height: 200,
              width: 200,
              borderColor: 'white',
              borderWidth: 3,
              borderRadius: 100,
            }}
          />
        </View>
        <View
          style={{
            flex: 2,
            borderRadius: 50,
            padding: 10,
            marginTop: -40,
            backgroundColor: '#f2fdfb',
          }}>
          <Card containerStyle={{borderRadius: 20}}>
            <Card.Title style={{fontSize: 25, color: '#6a19d7'}}>
              {this.state.title}
            </Card.Title>
            <Card.Divider style={{borderWidth: 1.3}} />
            <View style={{flexDirection: 'row'}}>
              <FontAwesome5
                name="envelope"
                size={30}
                color="#6a19d7"
                style={{marginRight: 15}}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 5,
                }}>
                {this.state.userName}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <FontAwesome5
                name="lock"
                size={30}
                color="#6a19d7"
                style={{marginRight: 15}}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 5,
                }}>
                {this.state.password}
              </Text>
            </View>
          </Card>

          <Button
            icon={
              <FontAwesome5
                name="user-edit"
                size={30}
                color="white"
                style={{marginRight: 10}}
              />
            }
            onPress={() => this.setState({modalVisible: true})}
            containerStyle={{
              borderRadius: 30,
              marginTop: 25,
              borderWidth: 2,
              borderColor: '#6a19d7',
              backgroundColor: '#6a19d7',
              marginHorizontal: 30,
            }}
            buttonStyle={{backgroundColor: '#6a19d7'}}
            title="Edit"
            titleStyle={{
              fontSize: 20,
              color: 'white',
              fontWeight: 'bold',
            }}
            raised={true}
          />
          <Button
            icon={
              <FontAwesome5
                name="trash"
                size={30}
                color="white"
                style={{marginRight: 10}}
              />
            }
            onPress={() => {
              fetch('http://192.168.1.2:1111/', {
                method: 'delete',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  ID: this.state.id,
                  tableName: this.state.table,
                }),
              })
                .then((response) => response.json())
                .then((response) => {
                  Alert.alert('Successfully deleted !');
                  this.props.navigation.navigate('Home');
                })
                .catch((err) => console.log(err));
            }}
            containerStyle={{
              borderRadius: 30,
              marginTop: 25,
              borderWidth: 2,
              borderColor: '#6a19d7',
              backgroundColor: '#6a19d7',
              marginHorizontal: 30,
            }}
            buttonStyle={{backgroundColor: '#6a19d7'}}
            title="Delete"
            titleStyle={{
              fontSize: 20,
              color: 'white',
              fontWeight: 'bold',
            }}
            raised={true}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setState({modalVisible: false});
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#f2fdfb',
                height: '100%',
                width: '100%',
                position: 'absolute',
                bottom: 0,
              }}>
              <StatusBar backgroundColor="#6a19d7" barStyle="light-content" />
              <View
                style={styles.header_login}
                animation="bounce"
                duration={1500}>
                <Text style={styles.welcomeText}>Update Note !</Text>
              </View>
              <View
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
                    defaultValue={this.state.title}
                    value={this.state.title}
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
                    defaultValue={this.state.userName}
                    value={this.state.userName}
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
                    defaultValue={this.state.password}
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
                <Button
                  icon={
                    <FontAwesome5
                      name="save"
                      size={30}
                      color="white"
                      style={{marginRight: 10}}
                    />
                  }
                  /*onPress={() => this.props.navigation.navigate('Home')}*/
                  onPress={() => {
                    if (
                      this.state.title === '' ||
                      this.state.userName === '' ||
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
                          Title: this.state.title,
                          Username: this.state.userName,
                          Password: this.state.password,
                          ID: this.state.id,
                          table: this.state.table,
                        }),
                      })
                        .then((response) => response.json())
                        .then((response) => {
                          Alert.alert('Congratulations! \n Note updated !');
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
                  onPress={() => this.setState({modalVisible: false})}
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
              </View>
            </View>
          </Modal>
        </View>
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

export default DetailScreen;
