import React, {Component} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import {Button, Card, SearchBar} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      updateSearch: '',
      title: '',
      userName: '',
      password: '',
      modalVisible: false,
      table: this.props.route.params.tableName,
      loading: true,
      setModal: false,
      itemId: '',
      d: [],
      total: '',
    };
  }

  fetchData = async () => {
    const response = await fetch('http://192.168.1.2:1111/');
    const information = await response.json();
    this.setState({
      data: information,
      loading: false,
      total: information.length,
    });
  };
  componentDidMount() {
    this.fetchData();
  }

  loadingData = () => {
    this.fetchData();
  };

  changeSearch(search) {
    if (search.length === 0) {
      this.setState({total: this.state.data.length});
    }
    fetch('http://192.168.1.2:1111/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        search: search,
        table: this.state.table,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({d: response, total: response.length});
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            backgroundColor: '#6a19d7',
          }}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Profile', {
                tableName: this.state.table,
                total: this.state.data.length,
              })
            }>
            <Image
              source={require('../Images/logo.jpg')}
              style={{
                height: 46,
                width: 46,
                borderRadius: 23,
                marginLeft: 5,
                marginBottom: 2,
                borderWidth: 2,
                borderColor: 'white',
              }}
            />
          </TouchableOpacity>
          <SearchBar
            containerStyle={{
              width: '80%',
              paddingLeft: 10,
              marginTop: -2,
              backgroundColor: '#6a19d7',
            }}
            inputContainerStyle={{backgroundColor: '#6a19d7', marginTop: -2}}
            placeholderTextColor="white"
            searchIcon={{color: 'white', size: 25}}
            inputStyle={{color: 'white', marginLeft: -5, fontSize: 20}}
            placeholder="Search Here..."
            onChangeText={(search) => {
              this.setState({updateSearch: search});
              this.changeSearch(search);
            }}
            value={this.state.updateSearch}
            clearIcon={{color: 'white', size: 25}}
          />
          <View style={{marginLeft: -15, paddingBottom: 5}}>
            <Text style={{color: '#00ffea', fontSize: 25}}>
              {this.state.total}
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            refreshing={this.state.loading}
            onRefresh={() => this.loadingData()}
            data={
              this.state.updateSearch === '' ? this.state.data : this.state.d
            }
            keyExtractor={(item) => item.ID.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onLongPress={() =>
                  this.setState({setModal: true, itemId: item.ID})
                }
                onPress={() =>
                  this.props.navigation.navigate('Details', {
                    title: item.Title,
                    userName: item.Username,
                    password: item.Password,
                    id: item.ID,
                    table: this.state.table,
                  })
                }>
                <Card containerStyle={{borderRadius: 30, margin: 10}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{width: '95%'}}>
                      <Text
                        style={{
                          fontSize: 25,
                          fontWeight: 'bold',
                          color: '#6a19d7',
                        }}>
                        {item.Title}
                      </Text>
                      <Text style={{fontSize: 18}}>{item.Username}</Text>
                    </View>
                    <FontAwesome5
                      name="chevron-right"
                      size={25}
                      style={{color: '#6a19d7'}}
                    />
                  </View>
                </Card>
              </TouchableOpacity>
            )}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.setModal}
          onRequestClose={() => this.setState({setModal: false})}>
          <View
            style={{
              borderRadius: 50,
              position: 'absolute',
              bottom: '40%',
              width: '80%',
              height: 150,
              backgroundColor: '#6a19d7',
              marginHorizontal: '10%',
            }}>
            <View
              style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
              <Text style={{fontSize: 22, color: 'white'}}>
                Do you want to delete ?
              </Text>
              <View style={{flexDirection: 'row', margin: 20}}>
                <View style={{marginRight: 20}}>
                  <Button
                    title="Yes"
                    onPress={() => {
                      fetch('http://192.168.1.2:1111/', {
                        method: 'delete',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          ID: this.state.itemId,
                          tableName: this.state.table,
                        }),
                      })
                        .then((response) => response.json())
                        .then((response) => {
                          Alert.alert('Successfully deleted !');
                          this.setState({setModal: false});
                          this.loadingData();
                        })
                        .catch((err) => console.log(err));
                    }}
                    raised={true}
                    type="outline"
                    containerStyle={{
                      borderRadius: 30,
                      width: 100,
                      borderWidth: 2,
                      borderColor: '#6a19d7',
                      backgroundColor: '#6a19d7',
                    }}
                    titleStyle={{
                      color: '#6a19d7',
                      fontWeight: 'bold',
                    }}
                  />
                </View>
                <Button
                  title="No"
                  onPress={() => {
                    this.setState({setModal: false});
                  }}
                  raised={true}
                  type="outline"
                  containerStyle={{
                    borderRadius: 30,
                    width: 100,
                    borderWidth: 2,
                    borderColor: '#6a19d7',
                    backgroundColor: '#6a19d7',
                  }}
                  titleStyle={{
                    color: '#6a19d7',
                    fontWeight: 'bold',
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
        <ActionButton
          buttonColor="rgba(82, 63, 191, 1)"
          onPress={() =>
            this.props.navigation.navigate('Create Note', {
              tableName: this.state.table,
            })
          }
        />
      </View>
    );
  }
}

export default HomeScreen;
