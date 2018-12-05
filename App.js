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
      //endpoint: "http://10.110.232.122:4001"
      endpoint: "http://10.0.2.2:4001"
    };
  }

  componentDidMount() {
    console.log('in componentDidMount');
    const { endpoint } = this.state;
    this.socket = SocketIOClient(endpoint);
    this.socket.on("connect",() => {console.log("client connected")

    this.socket.on("disconnect",() => {console.log("client disconnected")})

    this.socket.on("FromAPI", data => {
      console.log("client FromAPI");
      // this.setState({ response: data, counter: this.state.counter++ })
    });
    //this.socket.on("Example",data => {this.setState({response:data})});

    this.socket.on("sendFromServer",data =>{
      console.log("client sendFromServer");
      this.setState({response:(' Server - '+data)})
    })
  
    });
  }

  render() {
    const { response,counter } = this.state;
    return (
      <View style={{flex:1}}>
      <View style={{flex:1,backgroundColor:'#ABCDDA'}}>
      { response 
      ?
      <Text style={{fontSize:40}}>
        {response}
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
        onChangeText={(text) => {this.setState({response:(text)})}}
        />
        <TouchableWithoutFeedback onPress={() => {
          console.log("client send clicked")
          this.socket.emit("Example",this.state.response)}}>
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
