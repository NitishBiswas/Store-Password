import React, {Component} from 'react';
import {View, Text, FlatList, Alert} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Button, Card} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      table: this.props.route.params.tableName,
      total: this.props.route.params.total,
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

  render() {
    return (
      <FlatList
        data={this.state.data}
        keyExtractor={(item) => item.ID.toString()}
        renderItem={({item}) => (
          <View style={{flex: 1, backgroundColor: '#f2fdfb'}}>
            {this.state.table === item.Gmail ? (
              <View>
                <View
                  style={{
                    flex: 1.3,
                    backgroundColor: '#6a19d7',
                    alignItems: 'center',
                    paddingTop: 10,
                    paddingBottom: 50,
                  }}>
                  <Animatable.Image
                    source={
                      item.Image === ''
                        ? require('../Images/logo.jpg')
                        : {uri: item.Image}
                    }
                    style={{
                      height: 200,
                      width: 200,
                      borderColor: 'white',
                      borderWidth: 3,
                      borderRadius: 100,
                    }}
                    animation="bounceInUp"
                    duration={1500}
                  />
                </View>
                <View
                  style={{
                    flex: 1.7,
                    borderRadius: 50,
                    padding: 10,
                    marginTop: -40,
                    backgroundColor: '#f2fdfb',
                  }}>
                  <Card containerStyle={{borderRadius: 20}}>
                    <Card.Title style={{fontSize: 25, color: '#6a19d7'}}>
                      {item.Name}
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
                        {item.Gmail}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 15}}>
                      <FontAwesome5
                        name="phone-alt"
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
                        0{item.Phone}
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
                        {item.Password}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginBottom: 5,
                        color: '#6a19d7',
                        marginTop: 15,
                        position: 'absolute',
                        right: 1,
                        bottom: 1,
                      }}>
                      Total notes: {this.state.total}
                    </Text>
                  </Card>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 15,
                      justifyContent: 'space-around',
                    }}>
                    <Button
                      icon={
                        <FontAwesome5
                          name="user-edit"
                          size={30}
                          color="white"
                          style={{marginRight: 10}}
                        />
                      }
                      onPress={() =>
                        this.props.navigation.navigate('Update', {
                          name: item.Name,
                          gmail: item.Gmail,
                          phone: item.Phone,
                          password: item.Password,
                          image: item.Image,
                          id: item.ID,
                        })
                      }
                      containerStyle={{
                        borderRadius: 30,
                        borderWidth: 2,
                        borderColor: '#6a19d7',
                        backgroundColor: '#6a19d7',
                        width: '40%',
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
                        fetch('http://192.168.1.2:1111/registration', {
                          method: 'delete',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            ID: item.ID,
                            tableName: this.state.table,
                          }),
                        })
                          .then((response) => response.json())
                          .then((response) => {
                            Alert.alert('Successfully deleted!');
                            this.props.navigation.navigate('Login');
                          })
                          .catch((err) => console.log(err));
                      }}
                      containerStyle={{
                        borderRadius: 30,
                        borderWidth: 2,
                        borderColor: '#6a19d7',
                        backgroundColor: '#6a19d7',
                        width: '40%',
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
                  </View>
                  <Button
                    icon={
                      <FontAwesome5
                        name="sign-out-alt"
                        size={30}
                        color="red"
                        style={{marginRight: 10}}
                      />
                    }
                    onPress={() => {
                      Alert.alert('Logged out !');
                      this.props.navigation.navigate('Login');
                    }}
                    containerStyle={{
                      borderRadius: 30,
                      marginTop: 20,
                      borderWidth: 2,
                      borderColor: '#6a19d7',
                      backgroundColor: '#6a19d7',
                      marginHorizontal: 30,
                    }}
                    title="Logout"
                    titleStyle={{
                      fontSize: 20,
                      color: 'red',
                      fontWeight: 'bold',
                    }}
                    raised={true}
                    type="outline"
                  />
                </View>
              </View>
            ) : null}
          </View>
        )}
      />
    );
  }
}

export default ProfileScreen;
