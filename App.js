/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput,TouchableWithoutFeedback} from 'react-native';
window.navigator.userAgent = 'react-native';
import SocketIOClient from 'socket.io-client';

type Props = {};

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      counter: 0,
      endpoint: "http://localhost:4001"
    };
  }

  componentDidMount() {
    console.log('in componentDidMount');
    const { endpoint } = this.state;
    const socket = SocketIOClient(endpoint, {
      transports: ['websocket']
    });
    socket.on("FromAPI", data => this.setState({ response: data, counter: this.state.counter++ }));
  }
  
  render() {
    const { response,counter } = this.state;
    return (
      <View style={{flex:1}}>
      <View style={{flex:1,backgroundColor:'#ABCDDA'}}>
      { response 
      ?
      <Text>
        the message from server is {counter}
      </Text> 
        :
        <Text>
        default placeholder
      </Text> 
      }
      </View>
      <View style={{ justifyContent: 'flex-start', alignItems: 'flex-end', flexDirection:'row'}}>
        <TextInput
        style={{ flex:1, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => console.log('changed the text')}
        value='placeholder'/>
        <TouchableWithoutFeedback onPress={() => console.log("clicked")}>
        <Text style={{padding:15, borderColor: 'gray', borderWidth: 1 }}>Send</Text>
        </TouchableWithoutFeedback>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

 //   // Creating the socket-client instance will automatically connect to the server.
  //   this.socket = SocketIOClient('http://localhost:3000');
  //   this.socket.emit('channel1', 'Hi server'); // emits 'hi server' to your server
		
	// 	// Listens to channel2 and display the data recieved
  //   this.socket.on('channel2', (data) => {
  //       console.log('Data recieved from server', data); //this will console 'channel 2'
  //     });
	// clicked = () => {
		
	// 	const dataObj = {
	// 		action: 'click'
	// 	};
		
	// 	this.socket.emit('channel2', dataObj);
