import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import {Button} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import ImagePicker from 'react-native-image-crop-picker';

class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: '',
      email: '',
      number: '',
      password: '',
      img: '',
      passwordVisible: false,
      nameMark: false,
      emailMark: false,
      numberMark: false,
      showPasswordVisibility: true,
      modalVisible: false,
      uploadImage: false,
      confirmation: '',
    };
  }

  fetchData = async () => {
    const response = await fetch('http://192.168.1.2:1111/registration');
    const information = await response.json();
    this.setState({data: information});
  };

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
  changeNumber(numberText) {
    if (numberText.length !== 0) {
      this.setState({
        number: numberText,
        numberMark: true,
      });
    } else {
      this.setState({
        number: numberText,
        numberMark: false,
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

  handleImage(image) {
    const file = new FormData();
    file.append('file', image);
    file.append('upload_preset', 'storePassword');
    file.append('cloud_name', 'nitishbiswas');

    fetch('https://api.cloudinary.com/v1_1/nitishbiswas/image/upload', {
      body: file,
      method: 'POST',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.url);
        this.setState({img: res.url});
      })
      .catch((err) => console.warn('error:' + err));
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar backgroundColor="#6a19d7" barStyle="light-content" />
        <Animatable.View
          style={styles.header_login}
          animation="bounce"
          duration={1500}>
          <Text style={styles.welcomeText}>Registration !</Text>
        </Animatable.View>
        <Animatable.View
          style={styles.footer_login}
          animation="bounceInUp"
          duration={1500}>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 5,
                marginLeft: 42,
                alignItems: 'center',
              }}>
              <FontAwesome5 name="user" size={30} style={{color: '#6a19d7'}} />
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  marginLeft: 10,
                }}>
                Name
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
                placeholder="Enter your name"
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
                placeholder="Enter your email"
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
              <FontAwesome5
                name="address-book"
                size={30}
                style={{color: '#6a19d7'}}
              />
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  marginLeft: 10,
                }}>
                Number
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
                keyboardType="number-pad"
                placeholder="Enter your number"
                value={this.state.number}
                onChangeText={(numberText) => this.changeNumber(numberText)}
              />
              {this.state.numberMark ? (
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
                  marginLeft: 2,
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
                  name={
                    this.state.uploadImage ? 'check-circle' : 'cloud-upload-alt'
                  }
                  size={30}
                  color="#6a19d7"
                  style={{marginRight: 10}}
                />
              }
              onPress={() => this.setState({modalVisible: true})}
              titleStyle={{fontSize: 20, color: '#6a19d7', fontWeight: 'bold'}}
              containerStyle={[
                styles.buttonStyle,
                {
                  borderRadius: 30,
                  marginTop: 10,
                  borderColor: '#6a19d7',
                  borderWidth: 2,
                },
              ]}
              title={this.state.uploadImage ? 'Uploaded Image' : 'Upload Image'}
              type="outline"
              raised={true}
            />
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
                console.log(this.state.img);
                if (
                  this.state.name === '' ||
                  this.state.email === '' ||
                  this.state.password === '' ||
                  this.state.number === ''
                ) {
                  Alert.alert('Please insert data correctly');
                } else {
                  fetch('http://192.168.1.2:1111/registration', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      Name: this.state.name,
                      Gmail: this.state.email,
                      Password: this.state.password,
                      Phone: this.state.number,
                      Image: this.state.img,
                      Registration: 'Nitish',
                    }),
                  })
                    .then((response) => response.json())
                    .then((response) => {
                      Alert.alert(
                        'Congratulations! \n Registration Completed !',
                      );
                      this.props.navigation.navigate('Login');
                    })
                    .catch((error) => console.log(error));
                }
              }}
              titleStyle={{fontSize: 20, color: '#fff', fontWeight: 'bold'}}
              containerStyle={[
                styles.buttonStyle,
                {
                  borderRadius: 30,
                  marginTop: 10,
                  borderColor: '#6a19d7',
                  borderWidth: 2,
                  marginBottom: 15,
                },
              ]}
              buttonStyle={{backgroundColor: '#6a19d7'}}
              title="Save"
              type="outline"
              raised={true}
            />
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                this.setState({modalVisible: false});
              }}>
              <View style={styles.modalView}>
                <Button
                  icon={
                    <FontAwesome5
                      name="camera-retro"
                      size={30}
                      color="white"
                      style={{marginRight: 10}}
                    />
                  }
                  onPress={() => {
                    ImagePicker.openCamera({
                      width: 300,
                      height: 300,
                      cropping: true,
                    })
                      .then((res) => {
                        let newFile = {
                          uri: res.path,
                          type: `test/${res.path.split('.')[2]}`,
                          name: `test.${res.path.split('.')[2]}`,
                        };
                        this.handleImage(newFile);
                        this.setState({
                          /*image: res.path,*/
                          modalVisible: false,
                          uploadImage: true,
                        });
                      })
                      .catch(() =>
                        this.setState({
                          modalVisible: false,
                          uploadImage: false,
                        }),
                      );
                  }}
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
                  title="Take Photo"
                  type="outline"
                  raised={true}
                />
                <Button
                  icon={
                    <FontAwesome5
                      name="images"
                      size={30}
                      color="white"
                      style={{marginRight: 10}}
                    />
                  }
                  onPress={() => {
                    ImagePicker.openPicker({
                      width: 300,
                      height: 300,
                      cropping: true,
                    })
                      .then((res) => {
                        let newFile = {
                          uri: res.path,
                          type: `test/${res.path.split('.')[2]}`,
                          name: `test.${res.path.split('.')[2]}`,
                        };
                        this.handleImage(newFile);
                        this.setState({
                          /*image: res.path,*/
                          modalVisible: false,
                          uploadImage: true,
                        });
                      })
                      .catch(() =>
                        this.setState({
                          modalVisible: false,
                          uploadImage: false,
                        }),
                      );
                  }}
                  titleStyle={{fontSize: 20, color: '#fff', fontWeight: 'bold'}}
                  containerStyle={[
                    styles.buttonStyle,
                    {
                      borderRadius: 30,
                      marginTop: 10,
                      borderColor: '#6a19d7',
                      borderWidth: 2,
                    },
                  ]}
                  buttonStyle={{backgroundColor: '#6a19d7'}}
                  title="Choose from gallery"
                  type="outline"
                  raised={true}
                />
                <Button
                  onPress={() => this.setState({modalVisible: false})}
                  titleStyle={{
                    fontSize: 20,
                    color: '#6a19d7',
                    fontWeight: 'bold',
                  }}
                  containerStyle={[
                    styles.buttonStyle,
                    {
                      borderRadius: 30,
                      marginTop: 10,
                      borderColor: '#6a19d7',
                      borderWidth: 2,
                      marginBottom: 15,
                    },
                  ]}
                  title="Cancel"
                  type="outline"
                  raised={true}
                />
              </View>
            </Modal>
          </ScrollView>
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
    flex: 0.7,
    backgroundColor: '#6a19d7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer_login: {
    shadowColor: 'gray',
    flex: 2.3,
    borderRadius: 50,
    marginTop: -40,
    paddingTop: 15,
    backgroundColor: 'white',
  },
  buttonStyle: {
    marginHorizontal: 30,
    borderRadius: 10,
  },
  modalView: {
    backgroundColor: '#324740',
    bottom: -35,
    borderRadius: 40,
    height: 250,
    width: '100%',
    position: 'absolute',
  },
});

export default RegistrationScreen;
